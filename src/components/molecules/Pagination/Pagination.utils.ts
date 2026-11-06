import type {
  PaginationCountParams,
  PaginationRangeParams,
} from './Pagination.utils.types';
export function paginationCount({
  total,
  pageSize,
}: PaginationCountParams): number {
  if (pageSize <= 0) {
    return 0;
  }

  return Math.ceil(total / pageSize);
}

export function paginationRange({
  current,
  pageCount,
}: PaginationRangeParams): Array<number | 'ellipsis'> {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const pages = new Set<number>([
    1,
    pageCount,
    current - 1,
    current,
    current + 1,
  ]);
  const sorted = [...pages]
    .filter((page) => page >= 1 && page <= pageCount)
    .sort((left, right) => left - right);
  const range: Array<number | 'ellipsis'> = [];
  let last: number | undefined;

  for (const page of sorted) {
    if (last !== undefined && page - last > 1) {
      range.push('ellipsis');
    }

    range.push(page);
    last = page;
  }

  return range;
}
