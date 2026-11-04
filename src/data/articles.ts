import { unstable_cache } from 'next/cache';
import type { AppLocale } from '@/i18n/routing';
import { apiUrl } from '@/lib/api';

export const ARTICLES_REVALIDATE_SECONDS = 10800;
export const ARTICLES_CACHE_TAG = 'articles';

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
};

export type ArticleDetail = ArticleListItem & {
  authors: string[];
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

export type ArticleCategoryDetail = ArticleCategory & {
  articles: ArticleListItem[];
};

function articlesUrl(path: string, locale: AppLocale): URL {
  const url = new URL(path, apiUrl());
  url.searchParams.set('locale', locale);
  return url;
}

const fetchOptions: RequestInit =
  process.env.NODE_ENV === 'development'
    ? { cache: 'no-store' }
    : {
        next: {
          revalidate: ARTICLES_REVALIDATE_SECONDS,
          tags: [ARTICLES_CACHE_TAG],
        },
      };

export async function listArticles(
  locale: AppLocale,
): Promise<ArticleListItem[]> {
  const response = await fetch(articlesUrl('/articles', locale), fetchOptions);

  if (!response.ok) {
    throw new Error(`Failed to load articles: ${response.status}`);
  }

  return response.json() as Promise<ArticleListItem[]>;
}

export async function getArticleBySlug(
  slug: string,
  locale: AppLocale,
): Promise<ArticleDetail | null> {
  const response = await fetch(
    articlesUrl(`/articles/${encodeURIComponent(slug)}`, locale),
    fetchOptions,
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to load article: ${response.status}`);
  }

  return response.json() as Promise<ArticleDetail>;
}

const EXCLUDED_FIELDS = new Set([
  'dataset',
  'book',
  'book part',
  'thesis',
  'report',
  'presentation',
  'journal article',
  'research article',
  'article',
  'artigo',
  'artículo',
  'preprint',
  'research',
  'nature',
  'science',
  'cell',
  'lancet',
  'pnas',
]);

function isFieldOfStudy(field: string): boolean {
  const trimmed = field.trim();
  if (trimmed.length < 3) {
    return false;
  }

  if (/^[A-Z]{2,6}$/.test(trimmed)) {
    return false;
  }

  return !EXCLUDED_FIELDS.has(trimmed.toLowerCase());
}

export async function listCategories(
  locale: AppLocale,
): Promise<ArticleCategory[]> {
  const response = await fetch(
    articlesUrl('/categories', locale),
    fetchOptions,
  );

  if (!response.ok) {
    throw new Error(`Failed to load categories: ${response.status}`);
  }

  const categories = (await response.json()) as ArticleCategory[];
  return categories.filter((category) => isFieldOfStudy(category.field));
}

export async function getCategoryBySlug(
  slug: string,
  locale: AppLocale,
): Promise<ArticleCategoryDetail | null> {
  const response = await fetch(
    articlesUrl(`/categories/${encodeURIComponent(slug)}`, locale),
    fetchOptions,
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to load category: ${response.status}`);
  }

  return response.json() as Promise<ArticleCategoryDetail>;
}

export const getEditionDateIso = unstable_cache(
  async () => Temporal.Now.plainDateISO().toString(),
  ['edition-date'],
  {
    revalidate: ARTICLES_REVALIDATE_SECONDS,
    tags: [ARTICLES_CACHE_TAG],
  },
);

export function getArticleParagraphs(
  article: ArticleDetail,
  field: 'mediumPopularization' | 'fullPopularization',
): string[] {
  return article[field]
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
