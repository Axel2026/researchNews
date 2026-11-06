import type { ArticleFilterValues } from '@/components/molecules/ArticleFilters/ArticleFilters.types';

import type { ArticleCategory } from '@/data/articles.types';

import type { AppLocale } from '@/i18n/routing.types';

export type SearchScreenProps = {
  locale: AppLocale;
  categories: ArticleCategory[];
  initialQuery: string;
  initialFilters: ArticleFilterValues;
  initialPage: number;
};
