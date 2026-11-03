import { Article } from '@/components/Article/Article';
import type { ArticleListItem } from '@/data/articles';
import styles from './ArticleCardGrid.module.css';

export function ArticleCardGrid({
  articles,
  titleAs = 'h3',
  layout = 'wrap',
  showCategoryChip = true,
}: {
  articles: ArticleListItem[];
  titleAs?: 'h2' | 'h3';
  layout?: 'wrap' | 'row';
  showCategoryChip?: boolean;
}) {
  return (
    <ul className={layout === 'row' ? styles.rowGrid : styles.wrapGrid}>
      {articles.map((article) => (
        <li key={article.id}>
          <Article
            article={article}
            titleAs={titleAs}
            showCategoryChip={showCategoryChip}
          />
        </li>
      ))}
    </ul>
  );
}
