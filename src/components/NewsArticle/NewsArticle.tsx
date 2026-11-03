import { Button } from '@/components/Button/Button';
import { CategoryChip } from '@/components/CategoryChip/CategoryChip';
import { getArticleParagraphs, type ArticleDetail } from '@/data/articles';
import type { AppLocale } from '@/i18n/routing';
import { categoryPath } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';
import styles from './NewsArticle.module.css';

export type NewsArticleCopy = {
  kicker: string;
  bodyHeading: string;
  source: string;
  viewOriginal: string;
  download: string;
};

export function NewsArticleView({
  article,
  copy,
}: {
  article: ArticleDetail;
  copy: NewsArticleCopy;
}) {
  const summary = getArticleParagraphs(article, 'mediumPopularization');
  const body = getArticleParagraphs(article, 'fullPopularization');

  return (
    <>
      <p className={styles.kicker}>{copy.kicker}</p>
      <h1 className={styles.title}>{article.title}</h1>
      <p className={styles.dek}>{article.shortPopularization}</p>
      <div className={styles.meta}>
        <CategoryChip
          field={article.field}
          href={categoryPath(article.fieldSlug)}
        />
        <span className={styles.byline}>{article.authors.join(' · ')}</span>
      </div>

      <figure className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.imageUrl} alt="" width={1600} height={900} />
      </figure>

      <div className={styles.layout}>
        <article className={styles.story}>
          <section className={styles.summary}>
            {summary.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>
          <section className={styles.body}>
            <h2>{copy.bodyHeading}</h2>
            {body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>
        </article>

        <aside className={styles.aside} aria-labelledby="source-heading">
          <p id="source-heading" className={styles.asideLabel}>
            {copy.source}
          </p>
          <p className={styles.asideTitle}>{article.realTitle}</p>
          <p className={styles.asideMeta}>{article.authors.join(', ')}</p>
          <p className={styles.asideMeta}>{article.field}</p>
          <div className={styles.asideActions}>
            {article.sourceUrl ? (
              <Button
                className={styles.asideAction}
                href={article.sourceUrl}
                variant="primary"
              >
                {copy.viewOriginal}
              </Button>
            ) : null}
            {article.downloadUrl ? (
              <Button
                className={styles.asideAction}
                href={article.downloadUrl}
                variant="secondary"
              >
                {copy.download}
              </Button>
            ) : null}
          </div>
        </aside>
      </div>
    </>
  );
}

export async function NewsArticle({
  article,
  locale,
}: {
  article: ArticleDetail;
  locale: AppLocale;
}) {
  const t = await getTranslations({ locale });

  return (
    <NewsArticleView
      article={article}
      copy={{
        kicker: t('News.kicker'),
        bodyHeading: t('News.bodyHeading'),
        source: t('News.source'),
        viewOriginal: t('News.viewOriginal'),
        download: t('News.download'),
      }}
    />
  );
}
