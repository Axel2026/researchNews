import type { ArticleListItem } from '@/data/articles.types';

import type { AppLocale } from '@/i18n/routing.types';

export type CategoryFeedProps = {
  articles: ArticleListItem[];
  locale?: AppLocale;
};
