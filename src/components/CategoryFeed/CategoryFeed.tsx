import { ArticleCardGrid } from '@/components/ArticleCardGrid/ArticleCardGrid';
import type { ArticleListItem } from '@/data/articles';

export function CategoryFeed({ articles }: { articles: ArticleListItem[] }) {
  return (
    <ArticleCardGrid
      articles={articles}
      titleAs="h2"
      showCategoryChip={false}
    />
  );
}
