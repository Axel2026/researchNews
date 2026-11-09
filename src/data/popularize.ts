import { apiUrl } from '@/lib/api';
import type {
  PopularizeArticleParams,
  PopularizeArticleResult,
  PopularizeError,
} from './popularize.types';

const POPULARIZE_ERRORS = [
  'missing_key',
  'invalid_key',
  'already_popularized',
  'in_progress',
  'missing_abstract',
  'invalid_generation',
  'provider_error',
  'not_found',
] as const;

function isPopularizeError(value: string): value is PopularizeError {
  return (POPULARIZE_ERRORS as readonly string[]).includes(value);
}

export async function popularizeArticle({
  slug,
  provider,
  accessToken,
}: PopularizeArticleParams): Promise<PopularizeArticleResult> {
  const response = await fetch(
    new URL(`/articles/${slug}/popularize`, apiUrl()),
    {
      method: 'POST',
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ provider }),
    },
  );

  if (response.status === 204) {
    return { ok: true };
  }

  if (response.status === 401) {
    return { ok: false, error: 'unauthorized' };
  }

  let code = 'error';
  try {
    const body = (await response.json()) as { error?: string };
    if (body.error) {
      code = body.error;
    }
  } catch {
    code = 'error';
  }

  if (isPopularizeError(code)) {
    return { ok: false, error: code };
  }

  return { ok: false, error: 'error' };
}
