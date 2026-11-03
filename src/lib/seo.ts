import type { Metadata } from 'next';
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

export function newsPath(slug: string) {
  return `/news/${slug}`;
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
