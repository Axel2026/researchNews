import { unstable_cache } from 'next/cache';

export const ARTICLES_REVALIDATE_SECONDS = 10800;
export const ARTICLES_CACHE_TAG = 'articles';

export type PaperSummary = {
  id: string;
  slug: string;
  title: string;
  field: string;
  shortPopularization: string;
  imageUrl: string;
  publishedAt: string;
  featured: boolean;
};

export type Paper = PaperSummary & {
  authors: string[];
  realTitle: string;
  mediumPopularization: string;
  fullPopularization: string;
  doi: string | null;
  year: number | null;
  journal: string | null;
  sourceUrl: string | null;
};

export type PaperCategorySummary = {
  slug: string;
  field: string;
};

export type PaperCategory = PaperCategorySummary & {
  articles: PaperSummary[];
};

function apiUrl(): string {
  return (
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    'http://localhost:4000'
  );
}

function articlesUrl(path: string, locale: string): URL {
  const url = new URL(path, apiUrl());
  url.searchParams.set('locale', locale);
  return url;
}

const fetchOptions: RequestInit = {
  next: {
    revalidate: ARTICLES_REVALIDATE_SECONDS,
    tags: [ARTICLES_CACHE_TAG],
  },
};

export async function listPapers(locale: string): Promise<PaperSummary[]> {
  const response = await fetch(articlesUrl('/articles', locale), fetchOptions);

  if (!response.ok) {
    throw new Error(`Failed to load articles: ${response.status}`);
  }

  return response.json() as Promise<PaperSummary[]>;
}

export async function getPaperBySlug(
  slug: string,
  locale: string,
): Promise<Paper | null> {
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

  return response.json() as Promise<Paper>;
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
  locale: string,
): Promise<PaperCategorySummary[]> {
  const response = await fetch(
    articlesUrl('/categories', locale),
    fetchOptions,
  );

  if (!response.ok) {
    throw new Error(`Failed to load categories: ${response.status}`);
  }

  const categories = (await response.json()) as PaperCategorySummary[];
  return categories.filter((category) => isFieldOfStudy(category.field));
}

export async function getCategoryBySlug(
  slug: string,
  locale: string,
): Promise<PaperCategory | null> {
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

  return response.json() as Promise<PaperCategory>;
}

export const getEditionDateIso = unstable_cache(
  async () => Temporal.Now.plainDateISO().toString(),
  ['edition-date'],
  {
    revalidate: ARTICLES_REVALIDATE_SECONDS,
    tags: [ARTICLES_CACHE_TAG],
  },
);

export function getPaperParagraphs(
  paper: Paper,
  field: 'mediumPopularization' | 'fullPopularization',
): string[] {
  return paper[field]
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
