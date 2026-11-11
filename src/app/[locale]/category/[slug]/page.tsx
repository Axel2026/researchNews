import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { CategoryListing } from '../CategoryListing';
import { categoryMetadata } from '../CategoryListing.utils';
import type { CategoryPageProps } from './page.types';

export const dynamic = 'force-dynamic';
// ISR disabled because of AWS Amplify max bundle size limit
// export const revalidate = 10800;

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/category/[slug]'>) {
  const { locale, slug } = await params;
  return categoryMetadata({ locale, slug, page: 1 });
}

/*
 //ISR disabled because of AWS Amplify max bundle size limit
 export async function generateStaticParams() {
  const localeSlugs = await Promise.all(
    routing.locales.map(async (locale) => {
      const categories = await listCategories({ locale });
      return categories.map((category) => ({ locale, slug: category.slug }));
    }),
  );

  return localeSlugs.flat();
} */

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return <CategoryListing locale={locale} slug={slug} page={1} />;
}
