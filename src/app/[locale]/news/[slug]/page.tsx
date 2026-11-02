import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Button } from '@/components/Button/Button';
import {
  getPaperBySlug,
  getPaperParagraphs,
  getPaperSlugs,
} from '@/data/papers';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import styles from './page.module.css';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPaperSlugs().map((slug) => ({ locale, slug })),
  );
}

export default async function NewsPage({
  params,
}: PageProps<'/[locale]/news/[slug]'>) {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);

  if (!paper) {
    notFound();
  }

  const t = await getTranslations();
  const summary = getPaperParagraphs(paper, 'mediumPopularization');
  const article = getPaperParagraphs(paper, 'fullPopularization');

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          Badania<span>*</span>
        </Link>
        <nav className={styles.nav}>
          <Button href="/" variant="secondary">
            {t('Nav.stories')}
          </Button>
        </nav>
      </header>

      <main className={styles.main}>
        <p className={styles.kicker}>{t('News.kicker')}</p>
        <h1 className={styles.title}>{paper.title}</h1>
        <p className={styles.dek}>{paper.shortPopularization}</p>
        <div className={styles.meta}>
          <span className={styles.chip}>{paper.field}</span>
          <span className={styles.byline}>{paper.authors.join(' · ')}</span>
        </div>

        <figure className={styles.hero}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/news-placeholder.svg"
            alt=""
            width={1600}
            height={900}
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
              <h2>{t('News.bodyHeading')}</h2>
              {article.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </section>
          </article>

          <aside className={styles.aside}>
            <p className={styles.asideLabel}>{t('News.source')}</p>
            <p className={styles.asideTitle}>{paper.realTitle}</p>
            <p className={styles.asideMeta}>{paper.authors.join(', ')}</p>
            <p className={styles.asideMeta}>{paper.field}</p>
            <Button className={styles.asideAction} href="/" variant="primary">
              {t('News.moreStories')}
            </Button>
          </aside>
        </div>
      </main>
    </div>
  );
}
