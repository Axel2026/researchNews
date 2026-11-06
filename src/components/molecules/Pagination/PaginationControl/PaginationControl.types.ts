import type { ReactNode } from 'react';
import type { PaginationProps } from '../Pagination.types';

export type PaginationControlProps = {
  target: number;
  className: string;
  children: ReactNode;
  current?: boolean;
  labelled?: boolean;
  pageLabel: PaginationProps['pageLabel'];
  hrefFor?: PaginationProps['hrefFor'];
  onPage?: PaginationProps['onPage'];
};
