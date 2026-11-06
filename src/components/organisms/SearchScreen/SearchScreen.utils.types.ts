import type { ArticleSearchParams } from '@/data/articles.types';

export type SearchHrefParams = {
  params: ArticleSearchParams;
};

export type SearchKeyParams = {
  params: ArticleSearchParams;
};

export type IsInvalidRangeParams = {
  from: string;
  to: string;
};
