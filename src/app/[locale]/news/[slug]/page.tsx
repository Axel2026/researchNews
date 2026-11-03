import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Button } from '@/components/Button/Button';
import { NewsArticle } from '@/components/NewsArticle/NewsArticle';
import { getPaperBySlug, listPapers } from '@/data/papers';
import { getPathname, Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import {
  newsPath,
  ogLocaleByAppLocale,
  pageAlternates,
  socialImages,
} from '@/lib/seo';
import styles from './page.module.css';

export const revalidate = 10800;

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/news/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const paper = await getPaperBySlug(slug, locale);

  if (!paper) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const href = newsPath(slug);
  const description = paper.shortPopularization;
  const images = socialImages(paper.imageUrl, paper.title);

  return {
    title: paper.title,
    description,
    authors: paper.authors.map((name) => ({ name })),
    alternates: pageAlternates(locale, href),
    openGraph: {
      type: 'article',
      locale: ogLocaleByAppLocale[locale],
      siteName: t('title'),
      title: paper.title,
      description,
      url: getPathname({ locale, href }),
      publishedTime: paper.publishedAt,
      authors: paper.authors,
      section: paper.field,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: paper.title,
      description,
      images: images.map((image) => image.url),
    },
  };
}

export async function generateStaticParams() {
  const papers = await listPapers(routing.defaultLocale);

  return routing.locales.flatMap((locale) =>
    papers.map((paper) => ({ locale, slug: paper.slug })),
  );
}

export default async function NewsPage({
  params,
}: PageProps<'/[locale]/news/[slug]'>) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const paper = await getPaperBySlug(slug, locale);

  if (!paper) {
    notFound();
  }

  const t = await getTranslations({ locale });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.logo}
            src="/images/logo.svg"
            alt="ResearchNews"
            width={2048}
            height={683}
          />
        </Link>
        <nav className={styles.nav} aria-label={t('Nav.main')}>
          <Button href="/" variant="secondary">
            {t('Nav.stories')}
          </Button>
        </nav>
      </header>

      <main id="main" tabIndex={-1} className={styles.main}>
        <NewsArticle paper={paper} locale={locale} />
      </main>
    </div>
  );
}
