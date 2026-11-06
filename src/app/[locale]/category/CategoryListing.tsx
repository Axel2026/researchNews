import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Pagination } from '@/components/molecules/Pagination/Pagination';
import { paginationCount } from '@/components/molecules/Pagination/Pagination.utils';
import { Header } from '@/components/organisms/Header/Header';
import { ArticleListing } from '@/components/templates/ArticleListing/ArticleListing';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import { getCategoryBySlug, listCategories } from '@/data/articles';
import { categoryPagePath } from '@/lib/seo';
import type { CategoryListingProps } from './CategoryListing.types';

export async function CategoryListing({
  locale,
  slug,
  page,
}: CategoryListingProps) {
  const [category, categories] = await Promise.all([
    getCategoryBySlug({ slug, locale, page }),
    listCategories({ locale }),
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
    return categoryPagePath({ slug, page: pageNumber });
  }

  const pageCount = paginationCount({
    total: category.total,
    pageSize: category.pageSize,
  });

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
