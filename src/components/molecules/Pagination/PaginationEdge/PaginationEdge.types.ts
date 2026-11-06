import type { PaginationProps } from '../Pagination.types';

export type PaginationEdgeProps = {
  target: number;
  text: string;
  pageCount: number;
  pageLabel: PaginationProps['pageLabel'];
  hrefFor?: PaginationProps['hrefFor'];
  onPage?: PaginationProps['onPage'];
};
