import type {
  SafeNextPathParams,
  AuthCallbackUrlParams,
  LoginHrefParams,
} from './redirect.types';
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
