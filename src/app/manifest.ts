import type { MetadataRoute } from 'next';
import { SITE_THEME_COLOR } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Badania',
    short_name: 'Badania',
    description:
      'Popular-science articles about research: a short and full account of one paper in every story.',
    start_url: '/',
    display: 'standalone',
    background_color: SITE_THEME_COLOR,
    theme_color: SITE_THEME_COLOR,
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
