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

export const dynamic = 'force-dynamic';

function queryString(value: string | string[] | undefined): string {
  return typeof value === 'string' ? value : '';
}

function pageNumber(value: string | string[] | undefined): number {
  if (typeof value !== 'string' || !/^[1-9][0-9]*$/.test(value)) {
    return 1;
  }

  return Number(value);
}

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
    alternates: pageAlternates(locale, href),
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
    listCategories(locale),
    searchParams,
  ]);
  const initialFilters = {
    field: queryString(query.field),
    sort:
      queryString(query.sort) === 'popular'
        ? ('popular' as const)
        : ('newest' as const),
    author: queryString(query.author),
    from: queryString(query.from),
    to: queryString(query.to),
  };

  return (
    <PageShell header={<Header current="search" categories={categories} />}>
      <SearchScreen
        locale={locale as AppLocale}
        categories={categories}
        initialQuery={queryString(query.q)}
        initialFilters={initialFilters}
        initialPage={pageNumber(query.page)}
      />
    </PageShell>
  );
}
