import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { newsreader, sourceSans } from '@/fonts';
import '@/design-system/tokens.css';
import '../globals.css';
import { routing } from '@/i18n/routing';

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

  return {
    title: {
      default: t('title'),
      template: `%s · ${t('title')}`,
    },
    description: t('description'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
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
