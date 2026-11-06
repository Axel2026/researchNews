'use client';

import { useEffect } from 'react';
import { recordArticleView } from '@/data/articles';
import type { ArticleViewBeaconProps } from './ArticleViewBeacon.types';

const recorded = new Set<string>();

function viewKey(slug: string): string {
  return `view:${slug}:${new Date().toISOString().slice(0, 10)}`;
}

export function ArticleViewBeacon({ slug }: ArticleViewBeaconProps) {
  useEffect(() => {
    const key = viewKey(slug);

    if (recorded.has(key)) {
      return;
    }

    try {
      if (localStorage.getItem(key)) {
        recorded.add(key);
        return;
      }

      localStorage.setItem(key, '1');
    } catch {
      /* private mode still records once per tab via `recorded` */
    }

    recorded.add(key);
    void recordArticleView(slug).catch(() => {
      /* ranking can miss this view */
    });
  }, [slug]);

  return null;
}
