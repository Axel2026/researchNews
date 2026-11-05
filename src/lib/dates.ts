export function formatPaperPublishedAt(iso: string, locale: string): string {
  const zoned = Temporal.Instant.from(iso).toZonedDateTimeISO('UTC');
  const date = zoned.toPlainDate();

  if (
    date.month === 1 &&
    date.day === 1 &&
    zoned.hour === 0 &&
    zoned.minute === 0 &&
    zoned.second === 0
  ) {
    return String(date.year);
  }

  return date.toLocaleString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatCommentPostedAt(iso: string, locale: string): string {
  return Temporal.Instant.from(iso)
    .toZonedDateTimeISO(Temporal.Now.timeZoneId())
    .toLocaleString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
}
