import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Header } from '@/components/organisms/Header/Header';
import { ArticleListing } from '@/components/templates/ArticleListing/ArticleListing';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import { getCategoryBySlug, listCategories } from '@/data/articles';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import {
  categoryPath,
  defaultSocialImage,
  ogLocaleByAppLocale,
  pageAlternates,
} from '@/lib/seo';

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
    <PageShell
      header={
        <Header
          current="category"
          categories={categories}
          currentCategorySlug={slug}
        />
      }
    >
      <ArticleListing
        kicker={t('Category.kicker')}
        title={field}
        headingId="category-heading"
        articles={articles}
        locale={locale}
      />
    </PageShell>
  );
}
