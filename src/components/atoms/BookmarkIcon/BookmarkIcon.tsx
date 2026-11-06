import type { BookmarkIconProps } from './BookmarkIcon.types';

export function BookmarkIcon({ filled = false }: BookmarkIconProps) {
  const fill = filled ? 'currentColor' : 'none';

  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M7 4.8h10A1.2 1.2 0 0 1 18.2 6v13.1l-6.2-3.3-6.2 3.3V6A1.2 1.2 0 0 1 7 4.8Z"
        fill={fill}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
