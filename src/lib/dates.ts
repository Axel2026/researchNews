import type {
  FormatPaperPublishedAtParams,
  FormatCommentPostedAtParams,
  FormatPlainDateParams,
} from './dates.types';

function instant(iso: string): Date {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    throw new RangeError(`Invalid ISO instant: ${iso}`);
  }

  return date;
}

function plainDate(isoDate: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);

  if (!match) {
    throw new RangeError(`Invalid ISO date: ${isoDate}`);
  }

  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, monthIndex, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== monthIndex ||
    date.getUTCDate() !== day
  ) {
    throw new RangeError(`Invalid ISO date: ${isoDate}`);
  }

  return date;
}

export function formatPaperPublishedAt({
  iso,
  locale,
}: FormatPaperPublishedAtParams): string {
  const date = instant(iso);

  if (
    date.getUTCMonth() === 0 &&
    date.getUTCDate() === 1 &&
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0
  ) {
    return String(date.getUTCFullYear());
  }

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatCommentPostedAt({
  iso,
  locale,
}: FormatCommentPostedAtParams): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(instant(iso));
}

export function formatPlainDate({
  isoDate,
  locale,
}: FormatPlainDateParams): string {
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(plainDate(isoDate));
}

export function comparePlainDates(left: string, right: string): number {
  return Math.sign(plainDate(left).getTime() - plainDate(right).getTime());
}

export function localIsoDate(now = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
