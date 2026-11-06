import type { ReactNode } from 'react';

import type { ArticleDetail } from '@/data/articles.types';

import type { AppLocale } from '@/i18n/routing.types';

export type NewsArticleCopy = {
  bodyHeading: string;
  source: string;
  published: (date: string) => string;
  viewOriginal: string;
  download: string;
  opensNewTab: string;
};

export type NewsArticleViewProps = {
  article: ArticleDetail;
  locale?: AppLocale;
  copy: NewsArticleCopy;
  bookmarkAction?: ReactNode;
  discussion?: ReactNode;
};
