import { ArticleCardGrid } from '@/components/molecules/ArticleCardGrid/ArticleCardGrid';
import type { ArticleListItem } from '@/data/articles';
import type { AppLocale } from '@/i18n/routing';

export function CategoryFeed({
  articles,
  locale = 'en',
}: {
  articles: ArticleListItem[];
  locale?: AppLocale;
}) {
  return (
    <ArticleCardGrid
      articles={articles}
      locale={locale}
      titleAs="h2"
      showCategoryChip={false}
    />
  );
}
