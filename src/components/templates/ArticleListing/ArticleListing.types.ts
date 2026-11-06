import type { ReactNode } from 'react';

import type { ArticleListItem } from '@/data/articles.types';

import type { AppLocale } from '@/i18n/routing.types';

export type ArticleListingProps = {
  kicker: string;
  title: string;
  headingId: string;
  dek?: string;
  empty?: string;
  articles: ArticleListItem[];
  locale?: AppLocale;
  toolbar?: ReactNode;
  status?: ReactNode;
  pagination?: ReactNode;
};
