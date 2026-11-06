import styles from './PageShell.module.css';
import type { PageShellProps } from './PageShell.types';

export function PageShell({
  header,
  children,
  variant = 'feed',
}: PageShellProps) {
  const plainLinks = variant === 'feed' || variant === 'article';
  const pageClassName = plainLinks
    ? `${styles.page} ${styles.plainLinks}`
    : styles.page;

  return (
    <div className={pageClassName}>
      {header}
      {children != null ? (
        <main
          id="main"
          tabIndex={-1}
          className={`${styles.main} ${styles[variant]}`}
        >
          {children}
        </main>
      ) : null}
    </div>
  );
}
