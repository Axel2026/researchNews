import type { ArticleCategory } from '@/data/articles.types';

export type CategoryDropdownProps = {
  categories: ArticleCategory[];
  currentSlug?: string;
};
