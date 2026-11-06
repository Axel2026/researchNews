import type { ReactNode } from 'react';
import { CategoryFeed } from '@/components/organisms/CategoryFeed/CategoryFeed';
import type { ArticleListItem } from '@/data/articles';
import type { AppLocale } from '@/i18n/routing';
import styles from './ArticleListing.module.css';

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
}: {
  kicker: string;
  title: string;
  headingId: string;
  dek?: string;
  empty?: string;
  articles: ArticleListItem[];
  locale?: AppLocale;
  toolbar?: ReactNode;
  status?: ReactNode;
  pagination?: ReactNode;
}) {
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
