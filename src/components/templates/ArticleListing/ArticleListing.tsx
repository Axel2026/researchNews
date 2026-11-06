import { CategoryFeed } from '@/components/organisms/CategoryFeed/CategoryFeed';
import styles from './ArticleListing.module.css';
import type { ArticleListingProps } from './ArticleListing.types';

export function ArticleListing({
  kicker,
  title,
  headingId,
  dek,
  empty,
  articles,
  locale = 'en',
  toolbar,
  status,
  pagination,
}: ArticleListingProps) {
  const showFeed = articles.length > 0 || empty == null;

  return (
    <>
      <p className={styles.kicker}>{kicker}</p>
      <h1 id={headingId} className={styles.title}>
        {title}
      </h1>
      {dek ? <p className={styles.dek}>{dek}</p> : null}
      {toolbar}
      {status ??
        (showFeed ? (
          <section className={styles.feed} aria-labelledby={headingId}>
            <CategoryFeed articles={articles} locale={locale} />
          </section>
        ) : (
          <p className={styles.empty}>{empty}</p>
        ))}
      {status ? null : pagination}
    </>
  );
}
