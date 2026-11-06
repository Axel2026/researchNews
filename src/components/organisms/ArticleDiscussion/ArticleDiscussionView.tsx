'use client';

import { useId, useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { InfoHint } from '@/components/molecules/InfoHint/InfoHint';
import { COMMENT_MAX_LENGTH, isWithinCommentEditWindow } from '@/data/comments';
import { loginHref } from '@/lib/auth/redirect';
import styles from './ArticleDiscussion.module.css';
import type {
  ArticleDiscussionViewProps,
  CommentEntryProps,
  CommentComposerProps,
} from './ArticleDiscussionView.types';

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
}: ArticleDiscussionViewProps) {
  const showComposer =
    authStatus === 'authenticated' && !replyToId && !editingId;

  function submitTopLevel(body: string) {
    onSubmit?.(body);
  }

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
          onSubmit={submitTopLevel}
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
  const canEdit = canDelete && isWithinCommentEditWindow(comment.createdAt);
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
}: CommentComposerProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const [body, setBody] = useState(initialBody);
  const [localError, setLocalError] = useState<string | null>(null);
  const shownError = localError ?? error;
  const errorDescribedBy = shownError ? errorId : undefined;
  const submitBusy = busy || undefined;

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

  function changeBody(event: ChangeEvent<HTMLTextAreaElement>) {
    setBody(event.target.value);
    setLocalError(null);
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
          aria-describedby={errorDescribedBy}
          onChange={changeBody}
        />
        {shownError ? (
          <span id={errorId} className={styles.formError}>
            {shownError}
          </span>
        ) : null}
      </div>
      <div className={styles.formActions}>
        <Button type="submit" disabled={busy} aria-busy={submitBusy}>
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
