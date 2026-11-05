import type { AppLocale } from '@/i18n/routing';
import { apiUrl } from '@/lib/api';
import { ARTICLES_CACHE_TAG, ARTICLES_REVALIDATE_SECONDS } from './articles';

export type SourceListItem = {
  id: string;
  name: string;
  url: string;
  summary: string;
};

const fetchOptions: RequestInit =
  process.env.NODE_ENV === 'development'
    ? { cache: 'no-store' }
    : {
        next: {
          revalidate: ARTICLES_REVALIDATE_SECONDS,
          tags: [ARTICLES_CACHE_TAG],
        },
      };

export async function listSources(
  locale: AppLocale,
): Promise<SourceListItem[]> {
  const url = new URL('/sources', apiUrl());
  url.searchParams.set('locale', locale);
  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(`Failed to load sources: ${response.status}`);
  }

  return response.json() as Promise<SourceListItem[]>;
}
