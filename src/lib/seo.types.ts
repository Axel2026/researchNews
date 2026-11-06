import type { ArticleDetail } from '@/data/articles.types';

import { getPathname } from '@/i18n/navigation';

import type { AppLocale } from '@/i18n/routing.types';

export type PathHref = Parameters<typeof getPathname>[0]['href'];

export type ArticleJsonLdValue = {
  article: ArticleDetail;
  locale: AppLocale;
  siteName: string;
};
