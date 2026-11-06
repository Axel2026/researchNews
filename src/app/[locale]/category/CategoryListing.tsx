import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import {
  Pagination,
  paginationCount,
} from '@/components/molecules/Pagination/Pagination';
import { Header } from '@/components/organisms/Header/Header';
import { ArticleListing } from '@/components/templates/ArticleListing/ArticleListing';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import { getCategoryBySlug, listCategories } from '@/data/articles';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import {
  categoryPagePath,
  defaultSocialImage,
  ogLocaleByAppLocale,
  pageAlternates,
} from '@/lib/seo';
import type { CategoryListingProps } from './CategoryListing.types';

export async function categoryMetadata(
  locale: string,
  slug: string,
  page: number,
): Promise<Metadata> {
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const category = await getCategoryBySlug(slug, locale, page);

  if (!category) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const href = categoryPagePath(slug, page);
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

export async function CategoryListing({
  locale,
  slug,
  page,
}: CategoryListingProps) {
  const [category, categories] = await Promise.all([
    getCategoryBySlug(slug, locale, page),
    listCategories(locale),
  ]);

  if (!category) {
    notFound();
  }

  const t = await getTranslations({ locale });
  const tPagination = await getTranslations({
    locale,
    namespace: 'Pagination',
  });

  function pageLabel(pageNumber: number) {
    return tPagination('page', { page: pageNumber });
  }

  function pageHref(pageNumber: number) {
    return categoryPagePath(slug, pageNumber);
  }

  const pageCount = paginationCount(category.total, category.pageSize);

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
        title={category.field}
        headingId="category-heading"
        articles={category.articles}
        locale={locale}
        pagination={
          <Pagination
            label={tPagination('label')}
            previousLabel={tPagination('previous')}
            nextLabel={tPagination('next')}
            pageLabel={pageLabel}
            page={category.page}
            pageCount={pageCount}
            hrefFor={pageHref}
          />
        }
      />
    </PageShell>
  );
}
