import { createBrowserClient } from '@supabase/ssr';
import { publicSupabaseEnv } from './env';

export function createClient() {
  const env = publicSupabaseEnv();

  if (!env) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
    );
  }

  return createBrowserClient(env.url, env.key);
}
