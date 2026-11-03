import type { ArticleListItem } from '@/data/articles';
import { Link } from '@/i18n/navigation';
import styles from './Article.module.css';

export function Article({
  article,
  titleAs: Title = 'h3',
  showCategoryChip = true,
}: {
  article: ArticleListItem;
  titleAs?: 'h2' | 'h3';
  showCategoryChip?: boolean;
}) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.imageUrl} alt="" width={1600} height={900} />
      </div>
      <Title className={styles.title}>
        <Link href={`/news/${article.slug}`}>{article.title}</Link>
      </Title>
      <p className={styles.dek}>{article.shortPopularization}</p>
      {showCategoryChip ? <p className={styles.chip}>{article.field}</p> : null}
    </article>
  );
}
