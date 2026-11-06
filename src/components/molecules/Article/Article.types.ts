import type { ArticleListItem } from '@/data/articles.types';

import type { AppLocale } from '@/i18n/routing.types';

export type ArticleProps = {
  article: ArticleListItem;
  locale?: AppLocale;
  titleAs?: 'h2' | 'h3';
  showCategoryChip?: boolean;
};
