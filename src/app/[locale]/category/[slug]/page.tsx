import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CategoryDropdown } from '@/components/molecules/CategoryDropdown/CategoryDropdown';
import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher/LanguageSwitcher';
import { AccountMenu } from '@/components/organisms/AccountMenu/AccountMenu';
import { CategoryFeed } from '@/components/organisms/CategoryFeed/CategoryFeed';
import { getCategoryBySlug, listCategories } from '@/data/articles';
import { getPathname, Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import {
  categoryPath,
  defaultSocialImage,
  ogLocaleByAppLocale,
  pageAlternates,
} from '@/lib/seo';
import homeStyles from '../../page.module.css';
import styles from './page.module.css';

export const revalidate = 10800;

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/category/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const category = await getCategoryBySlug(slug, locale);

  if (!category) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const href = categoryPath(slug);
  const description = t('categoryDescription', { field: category.field });

  return {
    title: category.field,
    description,
    alternates: pageAlternates(locale, href),
    openGraph: {
      type: 'website',
      locale: ogLocaleByAppLocale[locale],
      siteName: t('title'),
      title: category.field,
      description,
      url: getPathname({ locale, href }),
      images: [{ ...defaultSocialImage, alt: category.field }],
    },
    twitter: {
      card: 'summary',
      title: category.field,
      description,
      images: [defaultSocialImage.url],
    },
  };
}

export async function generateStaticParams() {
  const localeSlugs = await Promise.all(
    routing.locales.map(async (locale) => {
      const categories = await listCategories(locale);
      return categories.map((category) => ({ locale, slug: category.slug }));
    }),
  );

  return localeSlugs.flat();
}

export default async function CategoryPage({
  params,
}: PageProps<'/[locale]/category/[slug]'>) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const [category, categories] = await Promise.all([
    getCategoryBySlug(slug, locale),
    listCategories(locale),
  ]);

  if (!category) {
    notFound();
  }

  const { field, articles } = category;
  const t = await getTranslations({ locale });

  return (
    <div className={homeStyles.page}>
      <header className={homeStyles.header}>
        <LanguageSwitcher />
        <div className={homeStyles.headerBar}>
          <div className={homeStyles.headerStart}>
            <Link className={homeStyles.brand} href="/">
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
              <CategoryDropdown categories={categories} currentSlug={slug} />
            </nav>
          </div>
          <AccountMenu />
        </div>
      </header>

      <main id="main" tabIndex={-1} className={homeStyles.main}>
        <p className={homeStyles.kicker}>{t('Category.kicker')}</p>
        <h1 className={styles.title}>{field}</h1>
        <section className={styles.feed} aria-label={field}>
          <CategoryFeed articles={articles} />
        </section>
      </main>
    </div>
  );
}
