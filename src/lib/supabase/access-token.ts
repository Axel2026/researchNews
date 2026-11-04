import { createClient } from './server';
import { publicSupabaseEnv } from './env';

export async function getAccessToken(): Promise<string | null> {
  if (publicSupabaseEnv() === null) {
    return null;
  }

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  } catch {
    return null;
  }
}
