import type { ArticleDetail } from '@/data/articles.types';

import type { AppLocale } from '@/i18n/routing.types';

export type NewsArticleProps = {
  article: ArticleDetail;
  locale: AppLocale;
};
