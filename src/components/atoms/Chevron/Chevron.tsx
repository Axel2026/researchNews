import type { ChevronProps } from './Chevron.types';

export function Chevron({ className, strokeWidth = 1.6 }: ChevronProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      width="12"
      height="12"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2.2 4.2 6 8l3.8-3.8"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
