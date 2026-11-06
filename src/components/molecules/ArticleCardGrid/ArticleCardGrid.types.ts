import type { ArticleListItem } from '@/data/articles.types';

import type { AppLocale } from '@/i18n/routing.types';

export type ArticleCardGridProps = {
  articles: ArticleListItem[];
  locale?: AppLocale;
  titleAs?: 'h2' | 'h3';
  layout?: 'wrap' | 'row';
  showCategoryChip?: boolean;
};
