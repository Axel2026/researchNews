'use client';

import { InfoHint } from '@/components/molecules/InfoHint/InfoHint';
import { isWithinCommentEditWindow } from '@/data/comments';
import { CommentComposer } from '../CommentComposer/CommentComposer';
import styles from '../ArticleDiscussion.module.css';
import type { CommentEntryProps } from './CommentEntry.types';

export function CommentEntry({
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
}: CommentEntryProps) {
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
  const canEdit =
    canDelete && isWithinCommentEditWindow({ createdAt: comment.createdAt });
  const bodyClassName = comment.deleted ? styles.deleted : styles.body;

  function submitEdit(body: string) {
    onSubmit?.(body);
  }

  function cancelEdit() {
    onEdit?.(null);
  }

  function toggleReply() {
    onReply?.(replyToId === comment.id ? null : comment.id);
  }

  function startEdit() {
    onEdit?.(comment.id);
  }

  function requestDelete() {
    onDelete?.(comment.id);
  }

  function submitReply(body: string) {
    onSubmit?.(body, comment.id);
  }

  function cancelReply() {
    onReply?.(null);
  }

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
          onSubmit={submitEdit}
          onCancel={cancelEdit}
        />
      ) : (
        <p className={bodyClassName}>
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
              onClick={toggleReply}
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
                onClick={startEdit}
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
              onClick={requestDelete}
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
          onSubmit={submitReply}
          onCancel={cancelReply}
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
