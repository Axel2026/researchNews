import type { MetadataRoute } from 'next';
import {
  ARTICLES_REVALIDATE_SECONDS,
  listArticles,
  listCategories,
} from '@/data/articles';
import { routing } from '@/i18n/routing';
import { articlePath, categoryPath, localizedSitemapEntries } from '@/lib/seo';

export const revalidate = ARTICLES_REVALIDATE_SECONDS;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, categories] = await Promise.all([
    listArticles(routing.defaultLocale),
    listCategories(routing.defaultLocale),
  ]);

  return [
    ...localizedSitemapEntries('/'),
    ...localizedSitemapEntries('/sources'),
    ...articles.flatMap((article) =>
      localizedSitemapEntries(articlePath(article.slug), article.publishedAt),
    ),
    ...categories.flatMap((category) =>
      localizedSitemapEntries(categoryPath(category.slug)),
    ),
  ];
}
