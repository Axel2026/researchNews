import { Article } from '@/components/molecules/Article/Article';
import styles from './ArticleCardGrid.module.css';
import type { ArticleCardGridProps } from './ArticleCardGrid.types';

export function ArticleCardGrid({
  articles,
  locale = 'en',
  titleAs = 'h3',
  layout = 'wrap',
  showCategoryChip = true,
}: ArticleCardGridProps) {
  const listClassName = layout === 'row' ? styles.rowGrid : styles.wrapGrid;

  return (
    <ul className={listClassName} role="list">
      {articles.map((article) => (
        <li key={article.id}>
          <Article
            article={article}
            locale={locale}
            titleAs={titleAs}
            showCategoryChip={showCategoryChip}
          />
        </li>
      ))}
    </ul>
  );
}
