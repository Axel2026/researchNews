import type { ResolveSiteUrlParams } from './site-url.types';

const LOCAL_FALLBACK = 'http://localhost:3000';

function isLoopback(value: string): boolean {
  try {
    const hostname = new URL(value).hostname;
    return hostname === 'localhost' || hostname === '127.0.0.1';
  } catch {
    return false;
  }
}

function amplifyOrigin({
  appId,
  branch,
}: Pick<ResolveSiteUrlParams, 'appId' | 'branch'>): string | undefined {
  if (!appId || !branch) {
    return undefined;
  }

  if (!/^[a-z0-9]+$/i.test(appId) || !/^[a-z0-9-]+$/i.test(branch)) {
    return undefined;
  }

  return `https://${branch}.${appId}.amplifyapp.com`;
}

export function resolveSiteUrl({
  configured,
  appId,
  branch,
}: ResolveSiteUrlParams): string {
  if (configured && !isLoopback(configured)) {
    return configured;
  }

  return amplifyOrigin({ appId, branch }) ?? configured ?? LOCAL_FALLBACK;
}
