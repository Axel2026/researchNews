import { ArticleImage } from '@/components/atoms/ArticleImage/ArticleImage';
import { Button } from '@/components/atoms/Button/Button';
import { CategoryChip } from '@/components/atoms/CategoryChip/CategoryChip';
import { getArticleParagraphs, type ArticleDetail } from '@/data/articles';
import { categoryPath } from '@/lib/seo';
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
        <ArticleImage
          src={article.imageUrl}
          sizes="(min-width: 46rem) 46rem, 100vw"
          priority
        />
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
