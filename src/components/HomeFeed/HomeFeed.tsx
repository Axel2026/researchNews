import type { ArticleListItem } from '@/data/articles';
import { Link } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import styles from '@/app/[locale]/page.module.css';

export async function HomeFeed({
  articles,
  locale,
}: {
  articles: ArticleListItem[];
  locale: AppLocale;
}) {
  const t = await getTranslations({ locale });
  const [featured, ...latest] = articles;

  return (
    <>
      {featured ? (
        <article className={styles.featured}>
          <div className={styles.featuredMedia}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featured.imageUrl} alt="" width={1600} height={900} />
          </div>
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
            {latest.map((article) => (
              <li key={article.id}>
                <article className={styles.card}>
                  <div className={styles.cardMedia}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.imageUrl}
                      alt=""
                      width={1600}
                      height={900}
                    />
                  </div>
                  <h3 className={styles.cardTitle}>
                    <Link href={`/news/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className={styles.cardDek}>
                    {article.shortPopularization}
                  </p>
                  <p className={styles.chip}>{article.field}</p>
                </article>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
