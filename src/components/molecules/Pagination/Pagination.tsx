import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import styles from './Pagination.module.css';
import type { PaginationProps } from './Pagination.types';

export function paginationCount(total: number, pageSize: number): number {
  if (pageSize <= 0) {
    return 0;
  }

  return Math.ceil(total / pageSize);
}

export function paginationRange(
  current: number,
  pageCount: number,
): Array<number | 'ellipsis'> {
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

export function Pagination({
  label,
  previousLabel,
  nextLabel,
  pageLabel,
  page,
  pageCount,
  hrefFor,
  onPage,
}: PaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  function control(
    target: number,
    className: string,
    children: ReactNode,
    current = false,
    labelled = true,
  ) {
    const ariaLabel = labelled ? pageLabel(target) : undefined;

    if (current) {
      return (
        <span aria-current="page" aria-label={ariaLabel} className={className}>
          {children}
        </span>
      );
    }

    if (hrefFor) {
      return (
        <Link
          aria-label={ariaLabel}
          className={className}
          href={hrefFor(target)}
        >
          {children}
        </Link>
      );
    }

    function selectPage() {
      onPage?.(target);
    }

    return (
      <button
        aria-label={ariaLabel}
        className={className}
        type="button"
        onClick={selectPage}
      >
        {children}
      </button>
    );
  }

  function edge(target: number, text: string) {
    const disabled = target < 1 || target > pageCount;

    if (disabled) {
      return (
        <span aria-disabled="true" className={styles.disabled}>
          {text}
        </span>
      );
    }

    return control(target, styles.page, text, false, false);
  }

  return (
    <nav aria-label={label} className={styles.nav}>
      {edge(page - 1, previousLabel)}
      <ol className={styles.pages}>
        {paginationRange(page, pageCount).map((item, index) =>
          item === 'ellipsis' ? (
            <li key={`ellipsis-${index}`}>
              <span aria-hidden="true" className={styles.ellipsis}>
                …
              </span>
            </li>
          ) : (
            <li key={item}>
              {control(
                item,
                item === page ? styles.current : styles.page,
                item,
                item === page,
              )}
            </li>
          ),
        )}
      </ol>
      {edge(page + 1, nextLabel)}
    </nav>
  );
}
