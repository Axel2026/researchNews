import { PaginationEdge } from './PaginationEdge/PaginationEdge';
import { PaginationControl } from './PaginationControl/PaginationControl';
import styles from './Pagination.module.css';
import type { PaginationProps } from './Pagination.types';
import { paginationRange } from './Pagination.utils';

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

  return (
    <nav aria-label={label} className={styles.nav}>
      <PaginationEdge
        target={page - 1}
        text={previousLabel}
        pageCount={pageCount}
        pageLabel={pageLabel}
        hrefFor={hrefFor}
        onPage={onPage}
      />
      <ol className={styles.pages}>
        {paginationRange({ current: page, pageCount }).map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <li key={`ellipsis-${index}`}>
                <span aria-hidden="true" className={styles.ellipsis}>
                  …
                </span>
              </li>
            );
          }

          const current = item === page;
          const className = current ? styles.current : styles.page;

          return (
            <li key={item}>
              <PaginationControl
                target={item}
                className={className}
                current={current}
                pageLabel={pageLabel}
                hrefFor={hrefFor}
                onPage={onPage}
              >
                {item}
              </PaginationControl>
            </li>
          );
        })}
      </ol>
      <PaginationEdge
        target={page + 1}
        text={nextLabel}
        pageCount={pageCount}
        pageLabel={pageLabel}
        hrefFor={hrefFor}
        onPage={onPage}
      />
    </nav>
  );
}
