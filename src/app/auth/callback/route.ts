import { NextResponse } from 'next/server';
import { safeNextPath } from '@/lib/auth/redirect';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const next = safeNextPath(url.searchParams.get('next'));
  const login = safeNextPath(url.searchParams.get('login'), '/login');
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(failureUrl(url.origin, login));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(failureUrl(url.origin, login));
  }

  const response = NextResponse.redirect(new URL(next, url.origin));
  response.headers.set(
    'Cache-Control',
    'private, no-cache, no-store, must-revalidate, max-age=0',
  );
  return response;
}

function failureUrl(origin: string, login: string) {
  const target = new URL(login, origin);
  target.searchParams.set('error', 'auth');
  return target;
}
