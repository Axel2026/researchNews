import { unstable_cache } from 'next/cache';
import { apiUrl } from '@/lib/api';
import { localIsoDate } from '@/lib/dates';
import type {
  ArticleListItem,
  ArticleDetail,
  ArticleCategory,
  ArticlePage,
  ArticleCategoryDetail,
  ArticlesUrlParams,
  ListArticlesParams,
  SearchArticlesParams,
  GetArticleBySlugParams,
  IsFieldOfStudyParams,
  ListCategoriesParams,
  GetCategoryBySlugParams,
  GetArticleParagraphsParams,
  RecordArticleViewParams,
} from './articles.types';

/** ISR window used by fetch cache options. Route `export const revalidate` must repeat this number as a literal — Next.js rejects an imported segment config. */
export const ARTICLES_REVALIDATE_SECONDS = 10800;
export const ARTICLES_CACHE_TAG = 'articles';

function articlesUrl({ path, locale }: ArticlesUrlParams): URL {
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

export async function listArticles({
  locale,
}: ListArticlesParams): Promise<ArticleListItem[]> {
  const response = await fetch(
    articlesUrl({ path: '/articles', locale }),
    fetchOptions,
  );

  if (!response.ok) {
    throw new Error(`Failed to load articles: ${response.status}`);
  }

  return response.json() as Promise<ArticleListItem[]>;
}

export async function searchArticles({
  locale,
  params,
}: SearchArticlesParams): Promise<ArticlePage> {
  const url = articlesUrl({ path: '/articles', locale });
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

export async function getArticleBySlug({
  slug,
  locale,
}: GetArticleBySlugParams): Promise<ArticleDetail | null> {
  const response = await fetch(
    articlesUrl({ path: `/articles/${encodeURIComponent(slug)}`, locale }),
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

/** Document types, journal titles, and the "Research" fallback CORE stores when it has no discipline. */
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

/**
 * Returns whether `field` names a discipline and can become a category.
 * CORE sometimes fills this column with a document type, a journal, a publisher acronym, or "Research".
 */
function isFieldOfStudy({ field }: IsFieldOfStudyParams): boolean {
  const trimmed = field.trim();

  // A discipline name is at least three characters. This also drops blanks and stray codes.
  if (trimmed.length < 3) {
    return false;
  }

  // Two to six capital letters are journal or publisher acronyms, such as PNAS or CELL.
  if (/^[A-Z]{2,6}$/.test(trimmed)) {
    return false;
  }

  // Comparison is case-insensitive, so "Artigo" and "Nature" hit the same list as their lowercase forms.
  return !EXCLUDED_FIELDS.has(trimmed.toLowerCase());
}

export async function listCategories({
  locale,
}: ListCategoriesParams): Promise<ArticleCategory[]> {
  const response = await fetch(
    articlesUrl({ path: '/categories', locale }),
    fetchOptions,
  );

  if (!response.ok) {
    throw new Error(`Failed to load categories: ${response.status}`);
  }

  const categories = (await response.json()) as ArticleCategory[];
  return categories.filter((category) =>
    isFieldOfStudy({ field: category.field }),
  );
}

export async function getCategoryBySlug({
  slug,
  locale,
  page,
}: GetCategoryBySlugParams): Promise<ArticleCategoryDetail | null> {
  const url = articlesUrl({
    path: `/categories/${encodeURIComponent(slug)}`,
    locale,
  });
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
  async () => localIsoDate(),
  ['edition-date'],
  {
    revalidate: ARTICLES_REVALIDATE_SECONDS,
    tags: [ARTICLES_CACHE_TAG],
  },
);

export function getArticleParagraphs({
  article,
  field,
}: GetArticleParagraphsParams): string[] {
  return article[field]
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export async function recordArticleView({
  slug,
}: RecordArticleViewParams): Promise<void> {
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
