import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/Button/Button';
import {
  getPaperBySlug,
  getPaperParagraphs,
  getPaperSlugs,
} from '@/data/papers';
import styles from './page.module.css';

export function generateStaticParams() {
  return getPaperSlugs().map((slug) => ({ slug }));
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);

  if (!paper) {
    notFound();
  }

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
            Opracowania
          </Button>
        </nav>
      </header>

      <main className={styles.main}>
        <p className={styles.kicker}>Opracowanie badania</p>
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
              <h2>Opracowanie</h2>
              {article.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </section>
          </article>

          <aside className={styles.aside}>
            <p className={styles.asideLabel}>Źródłowa praca</p>
            <p className={styles.asideTitle}>{paper.realTitle}</p>
            <p className={styles.asideMeta}>{paper.authors.join(', ')}</p>
            <p className={styles.asideMeta}>{paper.field}</p>
            <Button className={styles.asideAction} href="/" variant="primary">
              Więcej opracowań
            </Button>
          </aside>
        </div>
      </main>
    </div>
  );
}
