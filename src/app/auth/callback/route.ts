import { NextResponse } from 'next/server';
import { safeNextPath } from '@/lib/auth/redirect';
import { createClient } from '@/lib/supabase/server';
import { failureUrl } from './route.utils';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const next = safeNextPath({ value: url.searchParams.get('next') });
  const login = safeNextPath({
    value: url.searchParams.get('login'),
    fallback: '/login',
  });
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(failureUrl({ origin: url.origin, login }));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(failureUrl({ origin: url.origin, login }));
  }

  const response = NextResponse.redirect(new URL(next, url.origin));
  response.headers.set(
    'Cache-Control',
    'private, no-cache, no-store, must-revalidate, max-age=0',
  );
  return response;
}
