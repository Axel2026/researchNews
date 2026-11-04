import type { ReactNode } from 'react';
import styles from './PageShell.module.css';

export type PageShellVariant = 'feed' | 'article' | 'auth' | 'error';

export function PageShell({
  header,
  children,
  variant = 'feed',
}: {
  header?: ReactNode;
  children?: ReactNode;
  variant?: PageShellVariant;
}) {
  const plainLinks = variant === 'feed' || variant === 'article';

  return (
    <div
      className={
        plainLinks ? `${styles.page} ${styles.plainLinks}` : styles.page
      }
    >
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
