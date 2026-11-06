import type { ArticleListItem } from '@/data/articles.types';

export type PublicationTimestampParams = {
  article: ArticleListItem;
};

export type NewestFirstParams = {
  articles: ArticleListItem[];
};

export type PopularFirstParams = {
  articles: ArticleListItem[];
};
