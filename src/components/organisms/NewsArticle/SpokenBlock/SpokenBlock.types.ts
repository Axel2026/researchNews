import type { ReactNode } from 'react';

export type SpokenBlockProps = {
  as: 'h1' | 'h2' | 'p';
  segmentId: string;
  className?: string;
  activeClassName: string;
  children: ReactNode;
};
