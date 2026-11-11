import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Header } from '@/components/organisms/Header/Header';
import { NewsArticle } from '@/components/organisms/NewsArticle/NewsArticle';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import { getArticleBySlug } from '@/data/articles';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import {
  articlePath,
  ogLocaleByAppLocale,
  pageAlternates,
  socialImages,
} from '@/lib/seo';
import type { ArticlePageProps } from './page.types';

export const dynamic = 'force-dynamic';
// ISR disabled because of AWS Amplify max bundle size limit
// export const revalidate = 10800;

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/article/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const article = await getArticleBySlug({ slug, locale });

  if (!article) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const href = articlePath({ slug });
  const description = article.shortPopularization;
  const images = socialImages({ url: article.imageUrl, alt: article.title });

  return {
    title: article.title,
    description,
    authors: article.authors.map((name) => ({ name })),
    alternates: pageAlternates({ locale, href }),
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

/*
 //ISR disabled because of AWS Amplify max bundle size limit
export async function generateStaticParams() {
  const articles = await listArticles({ locale: routing.defaultLocale });

  return routing.locales.flatMap((locale) =>
    articles.map((article) => ({ locale, slug: article.slug })),
  );
} */

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const article = await getArticleBySlug({ slug, locale });

  if (!article) {
    notFound();
  }

  return (
    <PageShell header={<Header />} variant="article">
      <NewsArticle article={article} locale={locale} />
    </PageShell>
  );
}
