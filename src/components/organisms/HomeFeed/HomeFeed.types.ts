import type { ArticleCategory, ArticleListItem } from '@/data/articles.types';

import type { AppLocale } from '@/i18n/routing.types';

export type HomeFeedProps = {
  articles: ArticleListItem[];
  categories: ArticleCategory[];
  locale: AppLocale;
};
