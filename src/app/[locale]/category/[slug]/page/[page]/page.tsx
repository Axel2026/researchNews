import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { redirect } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { categoryPath } from '@/lib/seo';
import { CategoryListing, categoryMetadata } from '../../../CategoryListing';

export const revalidate = 10800;
export const dynamicParams = true;

const PAGE_NUMBER = /^[1-9][0-9]*$/;

export function generateStaticParams() {
  return [];
}

function pageNumber(page: string): number | undefined {
  if (!PAGE_NUMBER.test(page)) {
    return undefined;
  }

  return Number(page);
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/category/[slug]/page/[page]'>) {
  const { locale, slug, page } = await params;
  const parsed = pageNumber(page);

  if (parsed === undefined) {
    return {};
  }

  return categoryMetadata(locale, slug, parsed);
}

export default async function CategoryNumberedPage({
  params,
}: PageProps<'/[locale]/category/[slug]/page/[page]'>) {
  const { locale, slug, page } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const parsed = pageNumber(page);

  if (parsed === undefined) {
    notFound();
  }

  if (parsed === 1) {
    redirect({ href: categoryPath(slug), locale });
    return null;
  }

  return <CategoryListing locale={locale} slug={slug} page={parsed} />;
}
