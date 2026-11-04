import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/login',
        '/register',
        '/forgot-password',
        '/reset-password',
        '/*/login',
        '/*/register',
        '/*/forgot-password',
        '/*/reset-password',
        '/auth/',
      ],
    },
    sitemap: new URL('/sitemap.xml', getSiteUrl()).toString(),
  };
}
