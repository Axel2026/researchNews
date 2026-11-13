import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { resolveSiteUrl } from './src/lib/site-url';

const apiOrigin = new URL(
  process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    'http://localhost:4000',
);
const isLocalApi =
  apiOrigin.hostname === 'localhost' || apiOrigin.hostname === '127.0.0.1';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_URL: resolveSiteUrl({
      configured: process.env.NEXT_PUBLIC_SITE_URL,
      appId: process.env.AWS_APP_ID,
      branch: process.env.AWS_BRANCH,
    }),
  },
  reactCompiler: true,
  images: {
    ...(isLocalApi ? { dangerouslyAllowLocalIP: true } : {}),
    remotePatterns: [
      {
        protocol: apiOrigin.protocol === 'https:' ? 'https' : 'http',
        hostname: apiOrigin.hostname,
        ...(apiOrigin.port ? { port: apiOrigin.port } : {}),
        pathname: '/articles/**',
      },
      {
        protocol: 'https',
        hostname: 'core.ac.uk',
        pathname: '/image/**',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
