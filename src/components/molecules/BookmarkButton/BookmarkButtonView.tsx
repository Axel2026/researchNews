import { BookmarkIcon } from '@/components/atoms/BookmarkIcon/BookmarkIcon';
import { Button } from '@/components/atoms/Button/Button';
import { loginHref } from '@/lib/auth/redirect';
import styles from './BookmarkButton.module.css';

export type BookmarkButtonStatus =
  'pending' | 'anonymous' | 'saved' | 'unsaved';

export function BookmarkButtonView({
  status,
  nextPath,
  busy = false,
  onToggle,
  copy,
}: {
  status: BookmarkButtonStatus;
  nextPath: string;
  busy?: boolean;
  onToggle?: () => void;
  copy: {
    add: string;
    remove: string;
    signIn: string;
    loading: string;
  };
}) {
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

  return (
    <Button
      className={styles.button}
      variant={saved ? 'primary' : 'secondary'}
      disabled={busy}
      aria-pressed={saved}
      aria-busy={busy || undefined}
      onClick={onToggle}
    >
      <BookmarkIcon filled={saved} />
      {saved ? copy.remove : copy.add}
    </Button>
  );
}
