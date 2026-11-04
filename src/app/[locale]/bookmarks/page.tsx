import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CategoryDropdown } from '@/components/molecules/CategoryDropdown/CategoryDropdown';
import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher/LanguageSwitcher';
import { AccountMenu } from '@/components/organisms/AccountMenu/AccountMenu';
import { CategoryFeed } from '@/components/organisms/CategoryFeed/CategoryFeed';
import { listBookmarks } from '@/data/bookmarks';
import { listCategories } from '@/data/articles';
import { getPathname, Link, redirect } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { loginHref } from '@/lib/auth/redirect';
import {
  defaultSocialImage,
  ogLocaleByAppLocale,
  pageAlternates,
} from '@/lib/seo';
import { getAccessToken } from '@/lib/supabase/access-token';
import homeStyles from '../page.module.css';
import categoryStyles from '../category/[slug]/page.module.css';

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
    <div className={homeStyles.page}>
      <header className={homeStyles.header}>
        <div className={homeStyles.headerBar}>
          <div className={homeStyles.headerStart}>
            <Link
              className={homeStyles.brand}
              href="/"
              aria-label="ResearchNews"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- next/image does not optimize SVG */}
              <img
                className={homeStyles.logo}
                src="/images/logo.svg"
                alt="ResearchNews"
                width={2048}
                height={683}
              />
            </Link>
            <nav className={homeStyles.nav} aria-label={t('Nav.main')}>
              <Link className={homeStyles.navLink} href="/">
                {t('Nav.stories')}
              </Link>
              <CategoryDropdown categories={categories} />
            </nav>
          </div>
          <div className={homeStyles.headerActions}>
            <AccountMenu />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1} className={homeStyles.main}>
        <p className={homeStyles.kicker}>{t('Auth.account')}</p>
        <h1 id="bookmarks-heading" className={categoryStyles.title}>
          {t('Bookmarks.title')}
        </h1>
        <p className={homeStyles.subtitle}>{t('Bookmarks.dek')}</p>
        {articles.length > 0 ? (
          <section
            className={categoryStyles.feed}
            aria-labelledby="bookmarks-heading"
          >
            <CategoryFeed articles={articles} locale={locale} />
          </section>
        ) : (
          <p className={homeStyles.status}>{t('Bookmarks.empty')}</p>
        )}
      </main>
    </div>
  );
}
