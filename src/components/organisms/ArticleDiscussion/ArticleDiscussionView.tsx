'use client';

import { useId, useState, type FormEvent } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { InfoHint } from '@/components/molecules/InfoHint/InfoHint';
import type { CommentReply, CommentThread } from '@/data/comments';
import { COMMENT_MAX_LENGTH, isWithinCommentEditWindow } from '@/data/comments';
import { loginHref } from '@/lib/auth/redirect';
import styles from './ArticleDiscussion.module.css';

export type DiscussionLoadStatus = 'pending' | 'ready' | 'error';
export type DiscussionAuthStatus = 'pending' | 'anonymous' | 'authenticated';

export type ArticleDiscussionCopy = {
  title: string;
  empty: string;
  loading: string;
  error: string;
  signIn: string;
  placeholder: string;
  replyPlaceholder: string;
  submit: string;
  replySubmit: string;
  reply: string;
  edit: string;
  save: string;
  cancel: string;
  delete: string;
  deleted: string;
  edited: string;
  truncated: string;
  required: string;
  tooLong: string;
  composerLabel: string;
  replyLabel: string;
  editLabel: string;
  editHint: string;
  editHintLabel: string;
};

export function ArticleDiscussionView({
  status,
  authStatus,
  comments,
  truncated = false,
  currentUserId = null,
  nextPath,
  replyToId = null,
  editingId = null,
  busy = false,
  formError = null,
  composerKey = 0,
  copy,
  formatDate,
  onSubmit,
  onReply,
  onEdit,
  onDelete,
}: {
  status: DiscussionLoadStatus;
  authStatus: DiscussionAuthStatus;
  comments: CommentThread[];
  truncated?: boolean;
  currentUserId?: string | null;
  nextPath: string;
  replyToId?: string | null;
  editingId?: string | null;
  busy?: boolean;
  formError?: string | null;
  composerKey?: number;
  copy: ArticleDiscussionCopy;
  formatDate: (iso: string) => string;
  onSubmit?: (body: string, parentId?: string) => void;
  onReply?: (id: string | null) => void;
  onEdit?: (id: string | null) => void;
  onDelete?: (id: string) => void;
}) {
  const showComposer =
    authStatus === 'authenticated' && !replyToId && !editingId;

  return (
    <section className={styles.section} aria-labelledby="discussion-heading">
      <h2 id="discussion-heading" className={styles.title}>
        {copy.title}
      </h2>

      {status === 'pending' ? (
        <p className={styles.status} role="status">
          {copy.loading}
        </p>
      ) : null}

      {status === 'error' ? (
        <p className={styles.status} role="alert">
          {copy.error}
        </p>
      ) : null}

      {status === 'ready' && comments.length === 0 ? (
        <p className={styles.empty} role="status">
          {copy.empty}
        </p>
      ) : null}

      {status === 'ready' && comments.length > 0 ? (
        <ol className={styles.list}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.item}>
              <CommentEntry
                comment={comment}
                currentUserId={currentUserId}
                authStatus={authStatus}
                replyToId={replyToId}
                editingId={editingId}
                busy={busy}
                formError={formError}
                copy={copy}
                formatDate={formatDate}
                onSubmit={onSubmit}
                onReply={onReply}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ol>
      ) : null}

      {truncated ? <p className={styles.truncated}>{copy.truncated}</p> : null}

      {formError && !showComposer && !replyToId && !editingId ? (
        <p className={styles.status} role="alert">
          {formError}
        </p>
      ) : null}

      {authStatus === 'anonymous' ? (
        <p className={styles.signIn}>
          <Button href={loginHref(nextPath)} variant="secondary">
            {copy.signIn}
          </Button>
        </p>
      ) : null}

      {showComposer ? (
        <CommentComposer
          key={composerKey}
          label={copy.composerLabel}
          placeholder={copy.placeholder}
          submitLabel={copy.submit}
          error={formError}
          busy={busy}
          copy={copy}
          onSubmit={(body) => onSubmit?.(body)}
        />
      ) : null}
    </section>
  );
}

function CommentEntry({
  comment,
  currentUserId,
  authStatus,
  replyToId,
  editingId,
  busy,
  formError,
  copy,
  formatDate,
  onSubmit,
  onReply,
  onEdit,
  onDelete,
}: {
  comment: CommentThread | CommentReply;
  currentUserId: string | null;
  authStatus: DiscussionAuthStatus;
  replyToId: string | null;
  editingId: string | null;
  busy: boolean;
  formError: string | null;
  copy: ArticleDiscussionCopy;
  formatDate: (iso: string) => string;
  onSubmit?: (body: string, parentId?: string) => void;
  onReply?: (id: string | null) => void;
  onEdit?: (id: string | null) => void;
  onDelete?: (id: string) => void;
}) {
  const replies = 'replies' in comment ? comment.replies : undefined;
  const isTopLevel = replies !== undefined;
  const own = currentUserId === comment.author.id;
  const editing = editingId === comment.id;
  const edited = !comment.deleted && comment.createdAt !== comment.updatedAt;
  const canReply =
    isTopLevel &&
    authStatus === 'authenticated' &&
    !comment.deleted &&
    !editing;
  const canDelete = own && !comment.deleted && !editing;
  const canEdit = canDelete && isWithinCommentEditWindow(comment.createdAt);

  return (
    <>
      <div className={styles.meta}>
        <span className={styles.author}>{comment.author.displayName}</span>
        <time dateTime={comment.createdAt}>
          {formatDate(comment.createdAt)}
        </time>
        {edited ? <span>{copy.edited}</span> : null}
      </div>

      {editing ? (
        <CommentComposer
          initialBody={comment.body}
          label={copy.editLabel}
          placeholder={copy.placeholder}
          submitLabel={copy.save}
          cancelLabel={copy.cancel}
          error={formError}
          busy={busy}
          copy={copy}
          onSubmit={(body) => onSubmit?.(body)}
          onCancel={() => onEdit?.(null)}
        />
      ) : (
        <p className={comment.deleted ? styles.deleted : styles.body}>
          {comment.deleted ? copy.deleted : comment.body}
        </p>
      )}

      {canReply || canEdit || canDelete ? (
        <div className={styles.actions}>
          {canReply ? (
            <button
              type="button"
              className={styles.action}
              disabled={busy}
              onClick={() =>
                onReply?.(replyToId === comment.id ? null : comment.id)
              }
            >
              {replyToId === comment.id ? copy.cancel : copy.reply}
            </button>
          ) : null}
          {canEdit ? (
            <InfoHint hint={copy.editHint} label={copy.editHintLabel}>
              <button
                type="button"
                className={styles.action}
                disabled={busy}
                onClick={() => onEdit?.(comment.id)}
              >
                {copy.edit}
              </button>
            </InfoHint>
          ) : null}
          {canDelete ? (
            <button
              type="button"
              className={styles.action}
              disabled={busy}
              onClick={() => onDelete?.(comment.id)}
            >
              {copy.delete}
            </button>
          ) : null}
        </div>
      ) : null}

      {isTopLevel && replyToId === comment.id ? (
        <CommentComposer
          label={copy.replyLabel}
          placeholder={copy.replyPlaceholder}
          submitLabel={copy.replySubmit}
          cancelLabel={copy.cancel}
          error={formError}
          busy={busy}
          copy={copy}
          onSubmit={(body) => onSubmit?.(body, comment.id)}
          onCancel={() => onReply?.(null)}
        />
      ) : null}

      {replies && replies.length > 0 ? (
        <ol className={styles.replies}>
          {replies.map((reply) => (
            <li key={reply.id} className={styles.item}>
              <CommentEntry
                comment={reply}
                currentUserId={currentUserId}
                authStatus={authStatus}
                replyToId={replyToId}
                editingId={editingId}
                busy={busy}
                formError={formError}
                copy={copy}
                formatDate={formatDate}
                onSubmit={onSubmit}
                onReply={onReply}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ol>
      ) : null}
    </>
  );
}

function CommentComposer({
  initialBody = '',
  label,
  placeholder,
  submitLabel,
  cancelLabel,
  error,
  busy,
  copy,
  onSubmit,
  onCancel,
}: {
  initialBody?: string;
  label: string;
  placeholder: string;
  submitLabel: string;
  cancelLabel?: string;
  error: string | null;
  busy: boolean;
  copy: Pick<ArticleDiscussionCopy, 'required' | 'tooLong'>;
  onSubmit: (body: string) => void;
  onCancel?: () => void;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const [body, setBody] = useState(initialBody);
  const [localError, setLocalError] = useState<string | null>(null);
  const shownError = localError ?? error;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = body.trim();

    if (!next) {
      setLocalError(copy.required);
      return;
    }

    if (next.length > COMMENT_MAX_LENGTH) {
      setLocalError(copy.tooLong);
      return;
    }

    setLocalError(null);
    onSubmit(next);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <textarea
          id={id}
          className={styles.textarea}
          value={body}
          placeholder={placeholder}
          maxLength={COMMENT_MAX_LENGTH}
          disabled={busy}
          rows={4}
          aria-invalid={Boolean(shownError)}
          aria-required="true"
          aria-describedby={shownError ? errorId : undefined}
          onChange={(event) => {
            setBody(event.target.value);
            setLocalError(null);
          }}
        />
        {shownError ? (
          <span id={errorId} className={styles.formError}>
            {shownError}
          </span>
        ) : null}
      </div>
      <div className={styles.formActions}>
        <Button type="submit" disabled={busy} aria-busy={busy || undefined}>
          {submitLabel}
        </Button>
        {onCancel ? (
          <Button
            type="button"
            variant="secondary"
            disabled={busy}
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
        ) : null}
      </div>
    </form>
  );
}
