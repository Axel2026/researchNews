import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher/LanguageSwitcher';
import { AccountMenu } from '@/components/organisms/AccountMenu/AccountMenu';
import { NewsArticle } from '@/components/organisms/NewsArticle/NewsArticle';
import { getArticleBySlug, listArticles } from '@/data/articles';
import { getPathname, Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import {
  articlePath,
  ogLocaleByAppLocale,
  pageAlternates,
  socialImages,
} from '@/lib/seo';
import styles from './page.module.css';

export const revalidate = 10800;

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/article/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const href = articlePath(slug);
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

export default async function ArticlePage({
  params,
}: PageProps<'/[locale]/article/[slug]'>) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <LanguageSwitcher />
        <div className={styles.headerBar}>
          <Link className={styles.brand} href="/">
            {/* eslint-disable-next-line @next/next/no-img-element -- next/image does not optimize SVG */}
            <img
              className={styles.logo}
              src="/images/logo.svg"
              alt="ResearchNews"
              width={2048}
              height={683}
            />
          </Link>
          <AccountMenu />
        </div>
      </header>

      <main id="main" tabIndex={-1} className={styles.main}>
        <NewsArticle article={article} locale={locale} />
      </main>
    </div>
  );
}
