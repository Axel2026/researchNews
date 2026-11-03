import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Button } from '@/components/Button/Button';
import { NewsArticle } from '@/components/NewsArticle/NewsArticle';
import { getArticleBySlug, listArticles } from '@/data/articles';
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

  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const href = newsPath(slug);
  const description = article.shortPopularization;
  const images = socialImages(article.imageUrl, article.title);

  return {
    title: article.title,
    description,
    authors: article.authors.map((name) => ({ name })),
    alternates: pageAlternates(locale, href),
    openGraph: {
      type: 'article',
      locale: ogLocaleByAppLocale[locale],
      siteName: t('title'),
      title: article.title,
      description,
      url: getPathname({ locale, href }),
      publishedTime: article.publishedAt,
      authors: article.authors,
      section: article.field,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: images.map((image) => image.url),
    },
  };
}

export async function generateStaticParams() {
  const articles = await listArticles(routing.defaultLocale);

  return routing.locales.flatMap((locale) =>
    articles.map((article) => ({ locale, slug: article.slug })),
  );
}

export default async function NewsPage({
  params,
}: PageProps<'/[locale]/news/[slug]'>) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const article = await getArticleBySlug(slug, locale);

  if (!article) {
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
        <NewsArticle article={article} locale={locale} />
      </main>
    </div>
  );
}
