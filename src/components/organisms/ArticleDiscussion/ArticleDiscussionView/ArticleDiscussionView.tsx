import { Button } from '@/components/atoms/Button/Button';
import { loginHref } from '@/lib/auth/redirect';
import styles from '../ArticleDiscussion.module.css';
import type { ArticleDiscussionViewProps } from './ArticleDiscussionView.types';
import { CommentComposer } from '../CommentComposer/CommentComposer';
import { CommentEntry } from '../CommentEntry/CommentEntry';

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
          <Button href={loginHref({ nextPath })} variant="secondary">
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
