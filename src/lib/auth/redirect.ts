export function safeNextPath(value: string | null, fallback = '/'): string {
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

export function authCallbackUrl(nextPath: string, loginPath: string) {
  const url = new URL('/auth/callback', window.location.origin);
  url.searchParams.set('next', safeNextPath(nextPath));
  url.searchParams.set('login', safeNextPath(loginPath, '/login'));
  return url.toString();
}
