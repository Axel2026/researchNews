import type { AppLocale } from '@/i18n/routing.types';

export type SourceListItem = {
  id: string;
  name: string;
  url: string;
  summary: string;
};

export type ListSourcesParams = {
  locale: AppLocale;
};
