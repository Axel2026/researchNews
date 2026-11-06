import { ArticleImage } from '@/components/atoms/ArticleImage/ArticleImage';
import { Button } from '@/components/atoms/Button/Button';
import { CategoryChip } from '@/components/atoms/CategoryChip/CategoryChip';
import { ArticleListen } from '@/components/molecules/ArticleListen/ArticleListen';
import { getArticleParagraphs } from '@/data/articles';
import { formatPaperPublishedAt } from '@/lib/dates';
import { categoryPath } from '@/lib/seo';
import { buildSpeechSegments, speechLang } from '@/lib/speech/segments';
import { ArticleSpeechProvider } from '../ArticleSpeechProvider/ArticleSpeechProvider';
import styles from '../NewsArticle.module.css';
import { SpokenBlock } from '../SpokenBlock/SpokenBlock';
import type { NewsArticleViewProps } from './NewsArticleView.types';

export function NewsArticleView({
  article,
  locale = 'en',
  copy,
  bookmarkAction,
  discussion,
}: NewsArticleViewProps) {
  const summary = getArticleParagraphs({
    article,
    field: 'mediumPopularization',
  });
  const body = getArticleParagraphs({ article, field: 'fullPopularization' });
  const paperDate = article.paperPublishedAt
    ? formatPaperPublishedAt({ iso: article.paperPublishedAt, locale })
    : null;
  const segments = buildSpeechSegments({
    article,
    bodyHeading: copy.bodyHeading,
  });

  return (
    <ArticleSpeechProvider
      key={`${locale}:${article.slug}`}
      articleId={article.slug}
      segments={segments}
      lang={speechLang({ locale })}
    >
      <article>
        <SpokenBlock
          as="h1"
          segmentId="title"
          className={styles.title}
          activeClassName={styles.speaking}
        >
          {article.title}
        </SpokenBlock>
        <SpokenBlock
          as="p"
          segmentId="dek"
          className={styles.dek}
          activeClassName={styles.speaking}
        >
          {article.shortPopularization}
        </SpokenBlock>
        <div className={styles.meta}>
          <div className={styles.byline}>
            {article.paperPublishedAt && paperDate ? (
              <time dateTime={article.paperPublishedAt}>
                {copy.published(paperDate)}
              </time>
            ) : null}
            <span>{article.authors.join(' · ')}</span>
          </div>
          <CategoryChip
            field={article.field}
            href={categoryPath({ slug: article.fieldSlug })}
          />
          <div className={styles.actions}>
            {bookmarkAction}
            <ArticleListen />
          </div>
        </div>

        <figure className={styles.hero}>
          <ArticleImage
            src={article.imageUrl}
            alt={article.title}
            sizes="(min-width: 46rem) 46rem, 100vw"
            priority
          />
        </figure>

        <div className={styles.layout}>
          <div className={styles.story}>
            <section className={styles.summary}>
              {summary.map((paragraph, index) => (
                <SpokenBlock
                  key={index}
                  as="p"
                  segmentId={`summary-${index}`}
                  activeClassName={styles.speaking}
                >
                  {paragraph}
                </SpokenBlock>
              ))}
            </section>
            <section className={styles.body}>
              <SpokenBlock
                as="h2"
                segmentId="body-heading"
                activeClassName={styles.speaking}
              >
                {copy.bodyHeading}
              </SpokenBlock>
              {body.map((paragraph, index) => (
                <SpokenBlock
                  key={index}
                  as="p"
                  segmentId={`body-${index}`}
                  activeClassName={styles.speaking}
                >
                  {paragraph}
                </SpokenBlock>
              ))}
            </section>
          </div>

          <aside className={styles.aside} aria-labelledby="source-heading">
            <h2 id="source-heading" className={styles.asideLabel}>
              {copy.source}
            </h2>
            <p className={styles.asideTitle}>{article.realTitle}</p>
            {article.paperPublishedAt && paperDate ? (
              <p className={styles.asideMeta}>
                <time dateTime={article.paperPublishedAt}>
                  {copy.published(paperDate)}
                </time>
              </p>
            ) : null}
            <p className={styles.asideMeta}>{article.authors.join(', ')}</p>
            <p className={styles.asideMeta}>{article.field}</p>
            <div className={styles.asideActions}>
              {article.sourceUrl ? (
                <Button
                  className={styles.asideAction}
                  href={article.sourceUrl}
                  variant="primary"
                  newWindowHint={copy.opensNewTab}
                >
                  {copy.viewOriginal}
                </Button>
              ) : null}
              {article.downloadUrl ? (
                <Button
                  className={styles.asideAction}
                  href={article.downloadUrl}
                  variant="secondary"
                  newWindowHint={copy.opensNewTab}
                >
                  {copy.download}
                </Button>
              ) : null}
            </div>
          </aside>
        </div>
        {discussion ? (
          <div className={styles.discussion}>{discussion}</div>
        ) : null}
      </article>
    </ArticleSpeechProvider>
  );
}
