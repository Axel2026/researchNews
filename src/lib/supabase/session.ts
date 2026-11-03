import { createServerClient } from '@supabase/ssr';
import { type NextRequest, type NextResponse } from 'next/server';
import { publicSupabaseEnv } from './env';

type PendingCookie = {
  name: string;
  value: string;
  options: Parameters<NextResponse['cookies']['set']>[2];
};

export async function applySession(request: NextRequest) {
  const env = publicSupabaseEnv();

  if (!env) {
    return (response: NextResponse) => response;
  }

  const pending: PendingCookie[] = [];
  const cacheHeaders: Record<string, string> = {};

  try {
    const supabase = createServerClient(env.url, env.key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            pending.push({ name, value, options });
          });
          Object.assign(cacheHeaders, headers);
        },
      },
    });

    await supabase.auth.getUser();
  } catch {
    return (response: NextResponse) => response;
  }

  return (response: NextResponse) => {
    pending.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options);
    });

    for (const [name, value] of Object.entries(cacheHeaders)) {
      response.headers.set(name, value);
    }

    return response;
  };
}
