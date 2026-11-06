import type { ArticleDetail } from '@/data/articles.types';

import { getPathname } from '@/i18n/navigation';

import type { AppLocale } from '@/i18n/routing.types';

export type PathHref = Parameters<typeof getPathname>[0]['href'];

export type ArticleJsonLdValue = {
  article: ArticleDetail;
  locale: AppLocale;
  siteName: string;
};

export type AbsoluteUrlParams = {
  locale: AppLocale;
  href: PathHref;
};

export type AuthPageMetadataParams = {
  locale: AppLocale;
  href:
    | '/login'
    | '/register'
    | '/forgot-password'
    | '/reset-password'
    | '/bookmarks';
  title: string;
};

export type HreflangLanguagesParams = {
  href: PathHref;
};

export type PageAlternatesParams = {
  locale: AppLocale;
  href: PathHref;
};

export type ArticlePathParams = {
  slug: string;
};

export type CategoryPathParams = {
  slug: string;
};

export type CategoryPagePathParams = {
  slug: string;
  page: number;
};

export type SocialImagesParams = {
  url: string | undefined;
  alt: string;
};

export type SitemapLanguagesParams = {
  href: PathHref;
};

export type LocalizedSitemapEntriesParams = {
  href: PathHref;
  lastModified?: string | Date;
};

export type DoiUrlParams = {
  doi: string;
};
