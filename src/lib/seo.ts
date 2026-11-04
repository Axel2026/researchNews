import type { ArticleDetail } from '@/data/articles';
import type { Metadata, MetadataRoute } from 'next';
import { getPathname } from '@/i18n/navigation';
import { routing, type AppLocale } from '@/i18n/routing';

export const SITE_THEME_COLOR = '#f6f1e8';

type PathHref = Parameters<typeof getPathname>[0]['href'];

export const ogLocaleByAppLocale: Record<AppLocale, string> = {
  en: 'en_US',
  pl: 'pl_PL',
  de: 'de_DE',
  fr: 'fr_FR',
  es: 'es_ES',
};

export const defaultSocialImage = {
  url: '/android-chrome-512x512.png',
  width: 512,
  height: 512,
} as const;

export function getSiteUrl(): URL {
  return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000');
}

export function absoluteUrl(locale: AppLocale, href: PathHref): string {
  return new URL(getPathname({ locale, href }), getSiteUrl()).toString();
}

export const noIndexRobots = {
  index: false,
  follow: false,
} as const satisfies Metadata['robots'];

export function authPageMetadata(
  locale: AppLocale,
  href: '/login' | '/register' | '/forgot-password' | '/reset-password',
  title: string,
): Metadata {
  return {
    title,
    robots: noIndexRobots,
    alternates: pageAlternates(locale, href),
  };
}

export function hreflangLanguages(href: PathHref): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = getPathname({ locale, href });
  }

  languages['x-default'] = getPathname({
    locale: routing.defaultLocale,
    href,
  });

  return languages;
}

export function pageAlternates(
  locale: AppLocale,
  href: PathHref,
): NonNullable<Metadata['alternates']> {
  return {
    canonical: getPathname({ locale, href }),
    languages: hreflangLanguages(href),
  };
}

export const siteIcons = {
  icon: [
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  ],
  apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
} as const satisfies Metadata['icons'];

export function articlePath(slug: string) {
  return `/article/${slug}`;
}

export function categoryPath(slug: string) {
  return `/category/${slug}`;
}

export function socialImages(url: string | undefined, alt: string) {
  if (url && !/\.svg($|\?)/i.test(url)) {
    return [{ url, alt }];
  }

  return [{ ...defaultSocialImage, alt }];
}

export function sitemapLanguages(href: PathHref): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(locale, href);
  }

  languages['x-default'] = absoluteUrl(routing.defaultLocale, href);

  return languages;
}

export function localizedSitemapEntries(
  href: PathHref,
  lastModified?: string | Date,
): MetadataRoute.Sitemap {
  const languages = sitemapLanguages(href);

  return routing.locales.map((locale) => ({
    url: absoluteUrl(locale, href),
    lastModified,
    alternates: { languages },
  }));
}

function doiUrl(doi: string): string {
  if (/^https?:\/\//i.test(doi)) {
    return doi;
  }

  return `https://doi.org/${doi}`;
}

export function articleJsonLd({
  article,
  locale,
  siteName,
}: {
  article: ArticleDetail;
  locale: AppLocale;
  siteName: string;
}): Record<string, unknown> {
  const href = articlePath(article.slug);
  const url = absoluteUrl(locale, href);
  const origin = getSiteUrl();
  const image = socialImages(article.imageUrl, article.title)[0];

  const about: Record<string, unknown> = {
    '@type': 'ScholarlyArticle',
    name: article.realTitle,
    author: article.authors.map((name) => ({ '@type': 'Person', name })),
  };

  if (article.doi) {
    about.identifier = doiUrl(article.doi);
  }

  if (article.sourceUrl) {
    about.url = article.sourceUrl;
  }

  if (article.journal) {
    about.isPartOf = { '@type': 'Periodical', name: article.journal };
  }

  if (article.paperPublishedAt) {
    about.datePublished = article.paperPublishedAt;
  } else if (article.year) {
    about.datePublished = String(article.year);
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.shortPopularization,
    datePublished: article.publishedAt,
    inLanguage: locale,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: [new URL(image.url, origin).toString()],
    author: article.authors.map((name) => ({ '@type': 'Person', name })),
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: origin.toString(),
      logo: {
        '@type': 'ImageObject',
        url: new URL(defaultSocialImage.url, origin).toString(),
      },
    },
    articleSection: article.field,
    about,
  };
}
