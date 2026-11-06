import type { ReactNode } from 'react';

export type PageShellVariant = 'feed' | 'article' | 'auth' | 'error';

export type PageShellProps = {
  header?: ReactNode;
  children?: ReactNode;
  variant?: PageShellVariant;
};
