import type { ArticleListItem } from './articles.types';

export type BookmarkList = {
  slugs: string[];
  articles: ArticleListItem[];
};

export type BookmarkUpdate = {
  slugs: string[];
  bookmarked: boolean;
};
