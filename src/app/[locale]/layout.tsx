import type { Metadata, Viewport } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { newsreader, sourceSans } from '@/fonts';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import {
  defaultSocialImage,
  getSiteUrl,
  ogLocaleByAppLocale,
  pageAlternates,
  SITE_THEME_COLOR,
  siteIcons,
} from '@/lib/seo';
import { textSizeBootScript } from '@/lib/text-size';
import '@/design-system/tokens.css';
import '../globals.css';
import type { LocaleLayoutProps } from './layout.types';

export const viewport: Viewport = {
  themeColor: SITE_THEME_COLOR,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const title = t('title');
  const description = t('description');
  const href = '/';

  return {
    metadataBase: getSiteUrl(),
    applicationName: title,
    title: {
      default: title,
      template: `${title} | %s`,
    },
    description,
    icons: siteIcons,
    robots: {
      index: true,
      follow: true,
    },
    alternates: pageAlternates({ locale, href }),
    openGraph: {
      type: 'website',
      locale: ogLocaleByAppLocale[locale],
      alternateLocale: routing.locales
        .filter((item) => item !== locale)
        .map((item) => ogLocaleByAppLocale[item]),
      siteName: title,
      title,
      description,
      url: getPathname({ locale, href }),
      images: [{ ...defaultSocialImage, alt: title }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [defaultSocialImage.url],
    },
    appleWebApp: {
      title,
      statusBarStyle: 'default',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  const t = await getTranslations({ locale, namespace: 'Nav' });

  return (
    <html
      lang={locale}
      className={`${newsreader.variable} ${sourceSans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: textSizeBootScript() }} />
      </head>
      <body className={sourceSans.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a className="skipLink" href="#main">
            {t('skip')}
          </a>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
