import createMiddleware from 'next-intl/middleware';
import { type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { applySession } from './lib/supabase/session';

const handleI18n = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const writeSession = await applySession({ request });
  return writeSession(handleI18n(request));
}

export const config = {
  matcher: '/((?!api|auth|trpc|_next|_vercel|.*\\..*).*)',
};
