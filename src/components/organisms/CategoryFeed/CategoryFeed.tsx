import { ArticleCardGrid } from '@/components/molecules/ArticleCardGrid/ArticleCardGrid';
import type { CategoryFeedProps } from './CategoryFeed.types';

export function CategoryFeed({ articles, locale = 'en' }: CategoryFeedProps) {
  return (
    <ArticleCardGrid
      articles={articles}
      locale={locale}
      titleAs="h2"
      showCategoryChip={false}
    />
  );
}
