'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { Button } from '@/components/Button/Button';
import { getPaperBySlug, getPaperParagraphs, paperKeys } from '@/data/papers';
import styles from '@/app/[locale]/news/[slug]/page.module.css';

export function NewsArticle({ slug }: { slug: string }) {
  const locale = useLocale();
  const t = useTranslations();
  const { data, isPending, isError } = useQuery({
    queryKey: paperKeys.detail(locale, slug),
    queryFn: () => getPaperBySlug(slug, locale),
  });

  if (isPending) {
    return <p className={styles.status}>{t('Status.loading')}</p>;
  }

  if (isError) {
    return <p className={styles.status}>{t('Status.error')}</p>;
  }

  if (!data) {
    notFound();
  }

  const summary = getPaperParagraphs(data, 'mediumPopularization');
  const article = getPaperParagraphs(data, 'fullPopularization');

  return (
    <>
      <p className={styles.kicker}>{t('News.kicker')}</p>
      <h1 className={styles.title}>{data.title}</h1>
      <p className={styles.dek}>{data.shortPopularization}</p>
      <div className={styles.meta}>
        <span className={styles.chip}>{data.field}</span>
        <span className={styles.byline}>{data.authors.join(' · ')}</span>
      </div>

      <figure className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.imageUrl} alt="" width={1600} height={900} />
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

        <aside className={styles.aside}>
          <p className={styles.asideLabel}>{t('News.source')}</p>
          <p className={styles.asideTitle}>{data.realTitle}</p>
          <p className={styles.asideMeta}>{data.authors.join(', ')}</p>
          <p className={styles.asideMeta}>{data.field}</p>
          <Button className={styles.asideAction} href="/" variant="primary">
            {t('News.moreStories')}
          </Button>
        </aside>
      </div>
    </>
  );
}
