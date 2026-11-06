import type { FormatEditionDateParams } from './page.utils.types';
export function formatEditionDate({
  isoDate,
  locale,
}: FormatEditionDateParams) {
  return Temporal.PlainDate.from(isoDate).toLocaleString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
