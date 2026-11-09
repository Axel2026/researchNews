import type {
  SafeNextPathParams,
  AuthCallbackUrlParams,
  LoginHrefParams,
} from './redirect.types';

/**
 * Keeps an in-app path and rejects values that could leave the site.
 * Protocol-relative URLs, backslashes, schemes, and /auth paths fall back.
 */
export function safeNextPath({
  value,
  fallback = '/',
}: SafeNextPathParams): string {
  if (
    !value ||
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.startsWith('/auth') ||
    value.includes('\\') ||
    value.includes('://')
  ) {
    return fallback;
  }

  return value;
}

/**
 * Builds the Supabase redirect URL for /auth/callback.
 * next is where a successful sign-in lands; login is where a failure returns.
 */
export function authCallbackUrl({
  nextPath,
  loginPath,
}: AuthCallbackUrlParams) {
  const url = new URL('/auth/callback', window.location.origin);
  url.searchParams.set('next', safeNextPath({ value: nextPath }));
  url.searchParams.set(
    'login',
    safeNextPath({ value: loginPath, fallback: '/login' }),
  );
  return url.toString();
}

/** Builds the login link, carrying the current page as next when it is not the home page. */
export function loginHref({ nextPath }: LoginHrefParams) {
  const next = safeNextPath({ value: nextPath });

  if (next === '/') {
    return '/login';
  }

  return {
    pathname: '/login' as const,
    query: { next },
  };
}
