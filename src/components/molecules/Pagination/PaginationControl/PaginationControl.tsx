import { Link } from '@/i18n/navigation';
import type { PaginationControlProps } from './PaginationControl.types';

export function PaginationControl({
  target,
  className,
  children,
  current = false,
  labelled = true,
  pageLabel,
  hrefFor,
  onPage,
}: PaginationControlProps) {
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
      <Link aria-label={ariaLabel} className={className} href={hrefFor(target)}>
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
