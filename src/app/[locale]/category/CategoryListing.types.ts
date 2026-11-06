import type { AppLocale } from '@/i18n/routing.types';

export type CategoryListingProps = {
  locale: AppLocale;
  slug: string;
  page: number;
};
