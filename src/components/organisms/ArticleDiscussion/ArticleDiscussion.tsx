'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import {
  CommentsApiError,
  createComment,
  deleteComment,
  listComments,
  updateComment,
} from '@/data/comments';
import type { CommentThread } from '@/data/comments.types';
import { usePathname } from '@/i18n/navigation';
import { ConfirmModal } from '@/components/molecules/ConfirmModal/ConfirmModal';
import { formatCommentPostedAt } from '@/lib/dates';
import { createClient } from '@/lib/supabase/client';
import { publicSupabaseEnv } from '@/lib/supabase/env';
import { ArticleDiscussionView } from './ArticleDiscussionView/ArticleDiscussionView';
import type {
  DiscussionAuthStatus,
  DiscussionLoadStatus,
} from './ArticleDiscussionView/ArticleDiscussionView.types';
import type { ArticleDiscussionProps } from './ArticleDiscussion.types';

export function ArticleDiscussion({ slug }: ArticleDiscussionProps) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const configured = publicSupabaseEnv() !== null;
  const [status, setStatus] = useState<DiscussionLoadStatus>('pending');
  const [authStatus, setAuthStatus] = useState<DiscussionAuthStatus>(
    configured ? 'pending' : 'anonymous',
  );
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [comments, setComments] = useState<CommentThread[]>([]);
  const [truncated, setTruncated] = useState(false);
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [composerKey, setComposerKey] = useState(0);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    void listComments({ slug }).then(
      (result) => {
        if (!active) {
          return;
        }

        setComments(result.comments);
        setTruncated(result.truncated);
        setStatus('ready');
      },
      () => {
        if (active) {
          setStatus('error');
        }
      },
    );

    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!configured) {
      return;
    }

    let active = true;
    const supabase = createClient();

    const apply = (userId: string | null) => {
      if (!active) {
        return;
      }

      setCurrentUserId(userId);
      setAuthStatus(userId ? 'authenticated' : 'anonymous');
    };

    void supabase.auth.getSession().then(
      ({ data }) => {
        apply(data.session?.user.id ?? null);
      },
      () => {
        apply(null);
      },
    );

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      apply(session?.user.id ?? null);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [configured]);

  const copy = {
    title: t('Discussion.title'),
    empty: t('Discussion.empty'),
    loading: t('Status.loading'),
    error: t('Status.error'),
    signIn: t('Discussion.signIn'),
    placeholder: t('Discussion.placeholder'),
    replyPlaceholder: t('Discussion.replyPlaceholder'),
    submit: t('Discussion.submit'),
    replySubmit: t('Discussion.replySubmit'),
    reply: t('Discussion.reply'),
    edit: t('Discussion.edit'),
    save: t('Discussion.save'),
    cancel: t('Discussion.cancel'),
    delete: t('Discussion.delete'),
    deleted: t('Discussion.deleted'),
    edited: t('Discussion.edited'),
    truncated: t('Discussion.truncated'),
    required: t('Discussion.required'),
    tooLong: t('Discussion.tooLong'),
    composerLabel: t('Discussion.composerLabel'),
    replyLabel: t('Discussion.replyLabel'),
    editLabel: t('Discussion.editLabel'),
    editHint: t('Discussion.editHint'),
    editHintLabel: t('Discussion.editHintLabel'),
  };

  async function refresh() {
    const result = await listComments({ slug });
    setComments(result.comments);
    setTruncated(result.truncated);
    setStatus('ready');
  }

  async function accessToken(): Promise<string | null> {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token ?? null;

    if (!token) {
      setAuthStatus('anonymous');
      setCurrentUserId(null);
    }

    return token;
  }

  function errorMessage(error: unknown): string {
    if (error instanceof CommentsApiError && error.code === 'rate_limited') {
      return t('Discussion.rateLimited');
    }

    if (error instanceof CommentsApiError && error.code === 'invalid_body') {
      return t('Discussion.invalidBody');
    }

    if (error instanceof CommentsApiError && error.code === 'edit_expired') {
      return t('Discussion.editExpired');
    }

    if (error instanceof CommentsApiError && error.status === 401) {
      setAuthStatus('anonymous');
      setCurrentUserId(null);
    }

    return t('Discussion.genericError');
  }

  function startReply(id: string | null) {
    setReplyToId(id);
    setEditingId(null);
    setFormError(null);
  }

  function startEdit(id: string | null) {
    setEditingId(id);
    setReplyToId(null);
    setFormError(null);
  }

  function requestDelete(id: string) {
    if (busy) {
      return;
    }

    setPendingDeleteId(id);
    setFormError(null);
  }

  async function submitComment(body: string, parentId?: string) {
    if (busy) {
      return;
    }

    setBusy(true);
    setFormError(null);

    try {
      const token = await accessToken();
      if (!token) {
        return;
      }

      if (editingId) {
        await updateComment({ id: editingId, body, accessToken: token });
        setEditingId(null);
      } else {
        await createComment({ slug, body, accessToken: token, parentId });
        setReplyToId(null);
        if (!parentId) {
          setComposerKey((key) => key + 1);
        }
      }

      await refresh();
    } catch (error) {
      setFormError(errorMessage(error));
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete() {
    if (busy || !pendingDeleteId) {
      return;
    }

    const id = pendingDeleteId;
    setBusy(true);
    setFormError(null);

    try {
      const token = await accessToken();
      if (!token) {
        return;
      }

      await deleteComment({ id, accessToken: token });
      setPendingDeleteId(null);
      setEditingId(null);
      setReplyToId(null);
      await refresh();
    } catch (error) {
      setFormError(errorMessage(error));
    } finally {
      setBusy(false);
    }
  }

  function formatDate(iso: string) {
    return formatCommentPostedAt({ iso, locale });
  }

  function handleSubmit(body: string, parentId?: string) {
    void submitComment(body, parentId);
  }

  const deleteError = pendingDeleteId ? formError : null;

  function closeDelete() {
    setPendingDeleteId(null);
    setFormError(null);
  }

  function handleConfirmDelete() {
    void confirmDelete();
  }

  return (
    <>
      <ArticleDiscussionView
        status={status}
        authStatus={authStatus}
        comments={comments}
        truncated={truncated}
        currentUserId={currentUserId}
        nextPath={pathname}
        replyToId={replyToId}
        editingId={editingId}
        busy={busy}
        formError={formError}
        composerKey={composerKey}
        copy={copy}
        formatDate={formatDate}
        onReply={startReply}
        onEdit={startEdit}
        onDelete={requestDelete}
        onSubmit={handleSubmit}
      />
      <ConfirmModal
        open={pendingDeleteId !== null}
        title={t('Discussion.deleteConfirmTitle')}
        closeLabel={t('Nav.close')}
        cancelLabel={t('Discussion.cancel')}
        confirmLabel={t('Discussion.delete')}
        busy={busy}
        error={deleteError}
        onClose={closeDelete}
        onConfirm={handleConfirmDelete}
      >
        {t('Discussion.deleteConfirm')}
      </ConfirmModal>
    </>
  );
}
