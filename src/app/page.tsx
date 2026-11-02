import Link from 'next/link';
import { papers } from '@/data/papers';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

function formatEditionDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
    .format(date)
    .toUpperCase();
}

export default function Home() {
  const [featured, ...latest] = papers;
  const editionDate = formatEditionDate(new Date());

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          Badania<span>*</span>
        </Link>
        <nav className={styles.nav} aria-label="Główne">
          <Link className={styles.navCurrent} href="/">
            Opracowania
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <p className={styles.edition}>
          {editionDate}
          <span> / Weekly edition</span>
        </p>
        <h1 className={styles.masthead}>Research, in perspective.</h1>
        <p className={styles.subtitle}>
          Big ideas. Clear evidence. A little more context.
        </p>

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
              <p className={styles.kicker}>The big read</p>
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
                Read the story <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ) : null}

        {latest.length > 0 ? (
          <section className={styles.latest} aria-labelledby="latest-heading">
            <div className={styles.latestHeader}>
              <h2 id="latest-heading">Latest discoveries</h2>
              <p>New research, fresh insights and growing questions.</p>
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
