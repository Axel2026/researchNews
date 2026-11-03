import { isAxiosError } from 'axios';
import { api } from '@/lib/api';

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

export const paperKeys = {
  all: ['papers'] as const,
  list: (locale: string) => [...paperKeys.all, 'list', locale] as const,
  detail: (locale: string, slug: string) =>
    [...paperKeys.all, 'detail', locale, slug] as const,
};

export async function listPapers(locale: string): Promise<PaperSummary[]> {
  const { data } = await api.get<PaperSummary[]>('/articles', {
    params: { locale },
  });
  return data;
}

export async function getPaperBySlug(
  slug: string,
  locale: string,
): Promise<Paper | null> {
  try {
    const { data } = await api.get<Paper>(
      `/articles/${encodeURIComponent(slug)}`,
      { params: { locale } },
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export function getPaperParagraphs(
  paper: Paper,
  field: 'mediumPopularization' | 'fullPopularization',
): string[] {
  return paper[field]
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
