import { ArticleImage } from '@/components/atoms/ArticleImage/ArticleImage';
import { CategoryChip } from '@/components/atoms/CategoryChip/CategoryChip';
import { ArticleAuthors } from '@/components/molecules/ArticleAuthors/ArticleAuthors';
import { ArticleComments } from '@/components/molecules/ArticleComments/ArticleComments';
import { mediaMinLg } from '@/design-system/tokens';
import { Link } from '@/i18n/navigation';
import { formatPaperPublishedAt } from '@/lib/dates';
import styles from './Article.module.css';
import type { ArticleProps } from './Article.types';

export function Article({
  article,
  locale = 'en',
  titleAs: Title = 'h3',
  showCategoryChip = true,
}: ArticleProps) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <ArticleImage
          src={article.imageUrl}
          alt={article.title}
          sizes={`${mediaMinLg} 25vw, 16rem`}
        />
      </div>
      {showCategoryChip ? <CategoryChip field={article.field} /> : null}
      <Title className={styles.title}>
        <Link href={`/article/${article.slug}`}>{article.title}</Link>
      </Title>
      <p className={styles.dek}>{article.shortPopularization}</p>
      <div className={styles.meta}>
        {article.paperPublishedAt ? (
          <time className={styles.date} dateTime={article.paperPublishedAt}>
            {formatPaperPublishedAt({ iso: article.paperPublishedAt, locale })}
          </time>
        ) : null}
        {article.paperPublishedAt && article.authors.length > 0 ? (
          <span className={styles.separator} aria-hidden="true" />
        ) : null}
        <ArticleAuthors authors={article.authors} />
        {article.paperPublishedAt || article.authors.length > 0 ? (
          <span className={styles.separator} aria-hidden="true" />
        ) : null}
        <ArticleComments slug={article.slug} count={article.commentCount} />
      </div>
    </article>
  );
}
