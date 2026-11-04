import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Header } from '@/components/organisms/Header/Header';
import { ArticleListing } from '@/components/templates/ArticleListing/ArticleListing';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import { listBookmarks } from '@/data/bookmarks';
import { listCategories } from '@/data/articles';
import { getPathname, redirect } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { loginHref } from '@/lib/auth/redirect';
import {
  defaultSocialImage,
  ogLocaleByAppLocale,
  pageAlternates,
} from '@/lib/seo';
import { getAccessToken } from '@/lib/supabase/access-token';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/bookmarks'>): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Bookmarks' });
  const title = t('title');
  const description = t('dek');

  return {
    title,
    description,
    robots: { index: false, follow: false },
    alternates: pageAlternates(locale, '/bookmarks'),
    openGraph: {
      type: 'website',
      locale: ogLocaleByAppLocale[locale],
      title,
      description,
      url: getPathname({ locale, href: '/bookmarks' }),
      images: [{ ...defaultSocialImage, alt: title }],
    },
  };
}

export default async function BookmarksPage({
  params,
}: PageProps<'/[locale]/bookmarks'>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const token = await getAccessToken();
  const login = loginHref('/bookmarks');

  if (!token) {
    redirect({ href: login, locale });
    return null;
  }

  let articles;
  try {
    articles = (await listBookmarks(locale, token)).articles;
  } catch {
    redirect({ href: login, locale });
    return null;
  }

  const [categories, t] = await Promise.all([
    listCategories(locale),
    getTranslations({ locale }),
  ]);

  return (
    <PageShell header={<Header categories={categories} />}>
      <ArticleListing
        kicker={t('Auth.account')}
        title={t('Bookmarks.title')}
        headingId="bookmarks-heading"
        dek={t('Bookmarks.dek')}
        empty={t('Bookmarks.empty')}
        articles={articles}
        locale={locale}
      />
    </PageShell>
  );
}
