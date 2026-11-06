import { unstable_cache } from 'next/cache';
import type { AppLocale } from '@/i18n/routing.types';
import { apiUrl } from '@/lib/api';
import type {
  ArticleListItem,
  ArticleDetail,
  ArticleCategory,
  ArticlePage,
  ArticleCategoryDetail,
  ArticleSearchParams,
} from './articles.types';

export const ARTICLES_REVALIDATE_SECONDS = 10800;
export const ARTICLES_CACHE_TAG = 'articles';

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

export async function searchArticles(
  locale: AppLocale,
  params: ArticleSearchParams,
): Promise<ArticlePage> {
  const url = articlesUrl('/articles', locale);
  url.searchParams.set('sort', params.sort);
  url.searchParams.set('page', String(params.page));

  const optional = {
    q: params.query,
    field: params.field,
    author: params.author,
    from: params.from,
    to: params.to,
  } as const;

  for (const [key, value] of Object.entries(optional)) {
    const trimmed = value.trim();
    if (trimmed) {
      url.searchParams.set(key, trimmed);
    }
  }

  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Failed to search articles: ${response.status}`);
  }

  return response.json() as Promise<ArticlePage>;
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
  page: number,
): Promise<ArticleCategoryDetail | null> {
  const url = articlesUrl(`/categories/${encodeURIComponent(slug)}`, locale);
  url.searchParams.set('page', String(page));
  const response = await fetch(url, fetchOptions);

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

export async function recordArticleView(slug: string): Promise<void> {
  const response = await fetch(
    new URL(`/articles/${encodeURIComponent(slug)}/view`, apiUrl()),
    { method: 'POST', cache: 'no-store', keepalive: true },
  );

  if (response.status === 404) {
    return;
  }

  if (!response.ok) {
    throw new Error(`Failed to record article view: ${response.status}`);
  }
}
