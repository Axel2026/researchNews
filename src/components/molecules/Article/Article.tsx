import { ArticleImage } from '@/components/atoms/ArticleImage/ArticleImage';
import { CategoryChip } from '@/components/atoms/CategoryChip/CategoryChip';
import type { ArticleListItem } from '@/data/articles';
import { mediaMinLg } from '@/design-system/tokens';
import { Link } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import { formatPaperPublishedAt } from '@/lib/dates';
import styles from './Article.module.css';

export function Article({
  article,
  locale = 'en',
  titleAs: Title = 'h3',
  showCategoryChip = true,
}: {
  article: ArticleListItem;
  locale?: AppLocale;
  titleAs?: 'h2' | 'h3';
  showCategoryChip?: boolean;
}) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <ArticleImage
          src={article.imageUrl}
          sizes={`${mediaMinLg} 25vw, 16rem`}
        />
      </div>
      {showCategoryChip ? <CategoryChip field={article.field} /> : null}
      <Title className={styles.title}>
        <Link href={`/article/${article.slug}`}>{article.title}</Link>
      </Title>
      <p className={styles.dek}>{article.shortPopularization}</p>
      {article.paperPublishedAt ? (
        <time className={styles.date} dateTime={article.paperPublishedAt}>
          {formatPaperPublishedAt(article.paperPublishedAt, locale)}
        </time>
      ) : null}
    </article>
  );
}
