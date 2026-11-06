import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Header } from '@/components/organisms/Header/Header';
import { SearchScreen } from '@/components/organisms/SearchScreen/SearchScreen';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import { listCategories } from '@/data/articles';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import type { AppLocale } from '@/i18n/routing.types';
import {
  defaultSocialImage,
  noIndexRobots,
  ogLocaleByAppLocale,
  pageAlternates,
} from '@/lib/seo';
import type { SearchPageProps } from './page.types';
import { queryString, pageNumber } from './page.utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/search'>): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Search' });
  const title = t('title');
  const description = t('dek');
  const href = '/search';

  return {
    title,
    description,
    robots: noIndexRobots,
    alternates: pageAlternates({ locale, href }),
    openGraph: {
      type: 'website',
      locale: ogLocaleByAppLocale[locale],
      title,
      description,
      url: getPathname({ locale, href }),
      images: [{ ...defaultSocialImage, alt: title }],
    },
  };
}

export default async function SearchPage({
  params,
  searchParams,
}: SearchPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const [categories, query] = await Promise.all([
    listCategories({ locale }),
    searchParams,
  ]);
  const initialFilters = {
    field: queryString({ value: query.field }),
    sort:
      queryString({ value: query.sort }) === 'popular'
        ? ('popular' as const)
        : ('newest' as const),
    author: queryString({ value: query.author }),
    from: queryString({ value: query.from }),
    to: queryString({ value: query.to }),
  };

  return (
    <PageShell header={<Header current="search" categories={categories} />}>
      <SearchScreen
        locale={locale as AppLocale}
        categories={categories}
        initialQuery={queryString({ value: query.q })}
        initialFilters={initialFilters}
        initialPage={pageNumber({ value: query.page })}
      />
    </PageShell>
  );
}
