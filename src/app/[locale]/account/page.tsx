import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AccountPanel } from '@/components/organisms/AccountPanel/AccountPanel';
import { Header } from '@/components/organisms/Header/Header';
import { PageShell } from '@/components/templates/PageShell/PageShell';
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
import styles from './page.module.css';
import type { AccountPageProps } from './page.types';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/account'>): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Account' });
  const title = t('title');
  const description = t('dek');

  return {
    title,
    description,
    robots: { index: false, follow: false },
    alternates: pageAlternates({ locale, href: '/account' }),
    openGraph: {
      type: 'website',
      locale: ogLocaleByAppLocale[locale],
      title,
      description,
      url: getPathname({ locale, href: '/account' }),
      images: [{ ...defaultSocialImage, alt: title }],
    },
  };
}

export default async function AccountPage({ params }: AccountPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const token = await getAccessToken();

  if (!token) {
    redirect({ href: loginHref({ nextPath: '/account' }), locale });
    return null;
  }

  const [categories, t] = await Promise.all([
    listCategories({ locale }),
    getTranslations({ locale }),
  ]);

  return (
    <PageShell header={<Header categories={categories} />}>
      <p className={styles.kicker}>{t('Auth.account')}</p>
      <h1 className={styles.title}>{t('Account.title')}</h1>
      <p className={styles.dek}>{t('Account.dek')}</p>
      <AccountPanel />
    </PageShell>
  );
}
