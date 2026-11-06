import { BookmarkIcon } from '@/components/atoms/BookmarkIcon/BookmarkIcon';
import { Button } from '@/components/atoms/Button/Button';
import { loginHref } from '@/lib/auth/redirect';
import styles from './BookmarkButton.module.css';
import type { BookmarkButtonViewProps } from './BookmarkButtonView.types';

export function BookmarkButtonView({
  status,
  nextPath,
  busy = false,
  onToggle,
  copy,
}: BookmarkButtonViewProps) {
  if (status === 'pending') {
    return (
      <p className={styles.pending} role="status">
        {copy.loading}
      </p>
    );
  }

  if (status === 'anonymous') {
    return (
      <Button
        className={styles.button}
        href={loginHref(nextPath)}
        variant="secondary"
      >
        <BookmarkIcon />
        {copy.signIn}
      </Button>
    );
  }

  const saved = status === 'saved';
  const variant = saved ? 'primary' : 'secondary';
  const busyState = busy || undefined;

  return (
    <Button
      className={styles.button}
      variant={variant}
      disabled={busy}
      aria-pressed={saved}
      aria-busy={busyState}
      onClick={onToggle}
    >
      <BookmarkIcon filled={saved} />
      {saved ? copy.remove : copy.add}
    </Button>
  );
}
