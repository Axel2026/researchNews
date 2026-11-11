import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { redirect } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { categoryPath } from '@/lib/seo';
import { CategoryListing } from '../../../CategoryListing';
import { categoryMetadata } from '../../../CategoryListing.utils';
import type { CategoryNumberedPageProps } from './page.types';
import { pageNumber } from './page.utils';

export const dynamic = 'force-dynamic';

/* //ISR disabled because of AWS Amplify max bundle size limit
export const revalidate = 10800;
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
} */

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/category/[slug]/page/[page]'>) {
  const { locale, slug, page } = await params;
  const parsed = pageNumber({ page });

  if (parsed === undefined) {
    return {};
  }

  return categoryMetadata({ locale, slug, page: parsed });
}

export default async function CategoryNumberedPage({
  params,
}: CategoryNumberedPageProps) {
  const { locale, slug, page } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const parsed = pageNumber({ page });

  if (parsed === undefined) {
    notFound();
  }

  if (parsed === 1) {
    redirect({ href: categoryPath({ slug }), locale });
    return null;
  }

  return <CategoryListing locale={locale} slug={slug} page={parsed} />;
}
