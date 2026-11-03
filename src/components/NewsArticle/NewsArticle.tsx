import { Button } from '@/components/Button/Button';
import { getPaperParagraphs, type Paper } from '@/data/papers';
import type { AppLocale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import styles from '@/app/[locale]/news/[slug]/page.module.css';

export async function NewsArticle({
  paper,
  locale,
}: {
  paper: Paper;
  locale: AppLocale;
}) {
  const t = await getTranslations({ locale });
  const summary = getPaperParagraphs(paper, 'mediumPopularization');
  const article = getPaperParagraphs(paper, 'fullPopularization');

  return (
    <>
      <p className={styles.kicker}>{t('News.kicker')}</p>
      <h1 className={styles.title}>{paper.title}</h1>
      <p className={styles.dek}>{paper.shortPopularization}</p>
      <div className={styles.meta}>
        <span className={styles.chip}>{paper.field}</span>
        <span className={styles.byline}>{paper.authors.join(' · ')}</span>
      </div>

      <figure className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={paper.imageUrl} alt="" width={1600} height={900} />
      </figure>

      <div className={styles.layout}>
        <article className={styles.story}>
          <section className={styles.summary}>
            {summary.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>
          <section className={styles.body}>
            <h2>{t('News.bodyHeading')}</h2>
            {article.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>
        </article>

        <aside className={styles.aside} aria-labelledby="source-heading">
          <p id="source-heading" className={styles.asideLabel}>
            {t('News.source')}
          </p>
          <p className={styles.asideTitle}>{paper.realTitle}</p>
          <p className={styles.asideMeta}>{paper.authors.join(', ')}</p>
          <p className={styles.asideMeta}>{paper.field}</p>
          <Button className={styles.asideAction} href="/" variant="primary">
            {t('News.moreStories')}
          </Button>
        </aside>
      </div>
    </>
  );
}
