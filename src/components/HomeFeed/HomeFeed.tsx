'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { listPapers, paperKeys } from '@/data/papers';
import { Link } from '@/i18n/navigation';
import styles from '@/app/[locale]/page.module.css';

export function HomeFeed() {
  const locale = useLocale();
  const t = useTranslations();
  const { data, isPending, isError } = useQuery({
    queryKey: paperKeys.list(locale),
    queryFn: () => listPapers(locale),
  });

  if (isPending) {
    return <p className={styles.status}>{t('Status.loading')}</p>;
  }

  if (isError) {
    return <p className={styles.status}>{t('Status.error')}</p>;
  }

  const [featured, ...latest] = data;

  return (
    <>
      {featured ? (
        <article className={styles.featured}>
          <Link
            className={styles.featuredMedia}
            href={`/news/${featured.slug}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featured.imageUrl} alt="" width={1600} height={900} />
          </Link>
          <div className={styles.featuredCopy}>
            <p className={styles.kicker}>{t('Home.kicker')}</p>
            <h2 className={styles.featuredTitle}>
              <Link href={`/news/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p className={styles.featuredDek}>{featured.shortPopularization}</p>
            <p className={styles.chip}>{featured.field}</p>
            <Link className={styles.storyLink} href={`/news/${featured.slug}`}>
              {t('Home.readStory')} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      ) : null}

      {latest.length > 0 ? (
        <section className={styles.latest} aria-labelledby="latest-heading">
          <div className={styles.latestHeader}>
            <h2 id="latest-heading">{t('Home.latestTitle')}</h2>
            <p>{t('Home.latestDek')}</p>
          </div>
          <ul className={styles.latestGrid}>
            {latest.map((paper) => (
              <li key={paper.id}>
                <article className={styles.card}>
                  <Link
                    className={styles.cardMedia}
                    href={`/news/${paper.slug}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={paper.imageUrl}
                      alt=""
                      width={1600}
                      height={900}
                    />
                  </Link>
                  <h3 className={styles.cardTitle}>
                    <Link href={`/news/${paper.slug}`}>{paper.title}</Link>
                  </h3>
                  <p className={styles.cardDek}>{paper.shortPopularization}</p>
                  <p className={styles.chip}>{paper.field}</p>
                </article>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
