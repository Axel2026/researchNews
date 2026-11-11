import { formatPlainDate } from '@/lib/dates';
import type { FormatEditionDateParams } from './page.utils.types';

export function formatEditionDate({
  isoDate,
  locale,
}: FormatEditionDateParams) {
  return formatPlainDate({ isoDate, locale });
}
