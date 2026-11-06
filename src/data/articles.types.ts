import type { AppLocale } from '@/i18n/routing.types';

export type ArticleListItem = {
  id: string;
  slug: string;
  title: string;
  field: string;
  fieldSlug: string;
  shortPopularization: string;
  imageUrl: string;
  publishedAt: string;
  paperPublishedAt: string | null;
  featured: boolean;
  recentViews: number;
  authors: string[];
  commentCount: number;
};

export type ArticleDetail = ArticleListItem & {
  realTitle: string;
  mediumPopularization: string;
  fullPopularization: string;
  doi: string | null;
  year: number | null;
  journal: string | null;
  sourceUrl: string | null;
  downloadUrl: string | null;
};

export type ArticleCategory = {
  slug: string;
  field: string;
};

export type ArticlePage = {
  articles: ArticleListItem[];
  page: number;
  pageSize: number;
  total: number;
};

export type ArticleCategoryDetail = ArticleCategory & ArticlePage;

export type ArticleSearchParams = {
  query: string;
  field: string;
  sort: 'newest' | 'popular';
  author: string;
  from: string;
  to: string;
  page: number;
};

export type ArticlesUrlParams = {
  path: string;
  locale: AppLocale;
};

export type ListArticlesParams = {
  locale: AppLocale;
};

export type SearchArticlesParams = {
  locale: AppLocale;
  params: ArticleSearchParams;
};

export type GetArticleBySlugParams = {
  slug: string;
  locale: AppLocale;
};

export type IsFieldOfStudyParams = {
  field: string;
};

export type ListCategoriesParams = {
  locale: AppLocale;
};

export type GetCategoryBySlugParams = {
  slug: string;
  locale: AppLocale;
  page: number;
};

export type GetArticleParagraphsParams = {
  article: ArticleDetail;
  field: 'mediumPopularization' | 'fullPopularization';
};

export type RecordArticleViewParams = {
  slug: string;
};
