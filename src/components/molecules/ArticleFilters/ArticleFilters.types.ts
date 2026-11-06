import type { ArticleCategory } from '@/data/articles.types';

export type ArticleFilterValues = {
  field: string;
  sort: 'newest' | 'popular';
  author: string;
  from: string;
  to: string;
};

export type ArticleFiltersProps = {
  categories: ArticleCategory[];
  values: ArticleFilterValues;
  onChange: (next: ArticleFilterValues) => void;
  onClear: () => void;
  dateError?: string;
  lockedField?: string;
};
