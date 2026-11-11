import type { MetadataRoute } from 'next';
import { listArticles, listCategories } from '@/data/articles';
import { routing } from '@/i18n/routing';
import { articlePath, categoryPath, localizedSitemapEntries } from '@/lib/seo';

export const revalidate = 10800;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, categories] = await Promise.all([
    listArticles({ locale: routing.defaultLocale }),
    listCategories({ locale: routing.defaultLocale }),
  ]);

  return [
    ...localizedSitemapEntries({ href: '/' }),
    ...localizedSitemapEntries({ href: '/sources' }),
    ...articles.flatMap((article) =>
      localizedSitemapEntries({
        href: articlePath({ slug: article.slug }),
        lastModified: article.publishedAt,
      }),
    ),
    ...categories.flatMap((category) =>
      localizedSitemapEntries({ href: categoryPath({ slug: category.slug }) }),
    ),
  ];
}
