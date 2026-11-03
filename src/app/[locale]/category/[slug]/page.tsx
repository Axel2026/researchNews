import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CategoryDropdown } from '@/components/CategoryDropdown/CategoryDropdown';
import { CategoryFeed } from '@/components/CategoryFeed/CategoryFeed';
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import { getCategoryBySlug, listCategories } from '@/data/papers';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
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

  return {
    title: category.field,
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
        <Link className={homeStyles.brand} href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={homeStyles.logo}
            src="/images/logo.svg"
            alt="ResearchNews"
            width={2048}
            height={683}
          />
        </Link>
        <div className={homeStyles.headerEnd}>
          <nav className={homeStyles.nav} aria-label={t('Nav.main')}>
            <Link href="/">{t('Nav.stories')}</Link>
            <CategoryDropdown categories={categories} currentSlug={slug} />
          </nav>
          <LanguageSwitcher />
        </div>
      </header>

      <main id="main" tabIndex={-1} className={homeStyles.main}>
        <p className={homeStyles.kicker}>{t('Category.kicker')}</p>
        <h1 className={styles.title}>{field}</h1>
        <section className={styles.feed} aria-label={field}>
          <CategoryFeed papers={articles} />
        </section>
      </main>
    </div>
  );
}
