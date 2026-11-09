'use server';

import { revalidateTag } from 'next/cache';
import { ARTICLES_CACHE_TAG } from '@/data/articles';

export async function revalidateArticles(): Promise<void> {
  revalidateTag(ARTICLES_CACHE_TAG, 'max');
}
