import { PaginationControl } from '../PaginationControl/PaginationControl';
import styles from '../Pagination.module.css';
import type { PaginationEdgeProps } from './PaginationEdge.types';

export function PaginationEdge({
  target,
  text,
  pageCount,
  pageLabel,
  hrefFor,
  onPage,
}: PaginationEdgeProps) {
  const disabled = target < 1 || target > pageCount;

  if (disabled) {
    return (
      <span aria-disabled="true" className={styles.disabled}>
        {text}
      </span>
    );
  }

  return (
    <PaginationControl
      target={target}
      className={styles.page}
      current={false}
      labelled={false}
      pageLabel={pageLabel}
      hrefFor={hrefFor}
      onPage={onPage}
    >
      {text}
    </PaginationControl>
  );
}
