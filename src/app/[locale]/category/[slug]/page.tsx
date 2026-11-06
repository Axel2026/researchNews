import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { listCategories } from '@/data/articles';
import { routing } from '@/i18n/routing';
import { CategoryListing, categoryMetadata } from '../CategoryListing';

export const revalidate = 10800;

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/category/[slug]'>) {
  const { locale, slug } = await params;
  return categoryMetadata(locale, slug, 1);
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

  return <CategoryListing locale={locale} slug={slug} page={1} />;
}
