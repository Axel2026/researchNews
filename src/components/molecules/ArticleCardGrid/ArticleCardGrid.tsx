import { Article } from '@/components/molecules/Article/Article';
import type { ArticleListItem } from '@/data/articles';
import type { AppLocale } from '@/i18n/routing';
import styles from './ArticleCardGrid.module.css';

export function ArticleCardGrid({
  articles,
  locale = 'en',
  titleAs = 'h3',
  layout = 'wrap',
  showCategoryChip = true,
}: {
  articles: ArticleListItem[];
  locale?: AppLocale;
  titleAs?: 'h2' | 'h3';
  layout?: 'wrap' | 'row';
  showCategoryChip?: boolean;
}) {
  return (
    <ul
      className={layout === 'row' ? styles.rowGrid : styles.wrapGrid}
      role="list"
    >
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
