import type { SourceListItem } from '@/data/sources.types';

import type { AppLocale } from '@/i18n/routing.types';

export type SourceListProps = {
  sources: SourceListItem[];
  locale: AppLocale;
};
