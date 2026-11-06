import type { AppLocale } from '@/i18n/routing.types';
import type { ArticleListItem } from './articles.types';

export type BookmarkList = {
  slugs: string[];
  articles: ArticleListItem[];
};

export type BookmarkUpdate = {
  slugs: string[];
  bookmarked: boolean;
};

export type BookmarksUrlParams = {
  locale: AppLocale;
};

export type ListBookmarksParams = {
  locale: AppLocale;
  accessToken: string;
};

export type SetBookmarkParams = {
  slug: string;
  bookmarked: boolean;
  accessToken: string;
};
