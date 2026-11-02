import { getLocale, getTranslations } from 'next-intl/server';
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import { papers } from '@/data/papers';
import { Link } from '@/i18n/navigation';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

function formatEditionDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
    .format(date)
    .toUpperCase();
}

export default async function Home() {
  const t = await getTranslations();
  const locale = await getLocale();
  const [featured, ...latest] = papers;
  const editionDate = formatEditionDate(new Date(), locale);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          Badania<span>*</span>
        </Link>
        <div className={styles.headerEnd}>
          <nav className={styles.nav} aria-label={t('Nav.main')}>
            <Link className={styles.navCurrent} href="/">
              {t('Nav.stories')}
            </Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </header>

      <main className={styles.main}>
        <p className={styles.edition}>
          {editionDate}
          <span> / {t('Home.weeklyEdition')}</span>
        </p>
        <h1 className={styles.masthead}>{t('Home.masthead')}</h1>
        <p className={styles.subtitle}>{t('Home.subtitle')}</p>

        {featured ? (
          <article className={styles.featured}>
            <Link
              className={styles.featuredMedia}
              href={`/news/${featured.slug}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/news-placeholder.svg"
                alt=""
                width={1600}
                height={900}
              />
            </Link>
            <div className={styles.featuredCopy}>
              <p className={styles.kicker}>{t('Home.kicker')}</p>
              <h2 className={styles.featuredTitle}>
                <Link href={`/news/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p className={styles.featuredDek}>
                {featured.shortPopularization}
              </p>
              <p className={styles.chip}>{featured.field}</p>
              <Link
                className={styles.storyLink}
                href={`/news/${featured.slug}`}
              >
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
                        src="/images/news-placeholder.svg"
                        alt=""
                        width={1600}
                        height={900}
                      />
                    </Link>
                    <h3 className={styles.cardTitle}>
                      <Link href={`/news/${paper.slug}`}>{paper.title}</Link>
                    </h3>
                    <p className={styles.cardDek}>
                      {paper.shortPopularization}
                    </p>
                    <p className={styles.chip}>{paper.field}</p>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </div>
  );
}
