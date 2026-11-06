'use client';

import { useId, useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { COMMENT_MAX_LENGTH } from '@/data/comments';
import styles from '../ArticleDiscussion.module.css';
import type { CommentComposerProps } from './CommentComposer.types';

export function CommentComposer({
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
