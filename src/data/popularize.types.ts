import type { AiProvider } from './ai-keys.types';

export type PopularizeError =
  | 'missing_key'
  | 'invalid_key'
  | 'already_popularized'
  | 'in_progress'
  | 'missing_abstract'
  | 'invalid_generation'
  | 'provider_error'
  | 'not_found';

export type PopularizeArticleParams = {
  slug: string;
  provider: AiProvider;
  accessToken: string;
};

export type PopularizeArticleResult =
  | { ok: true }
  | { ok: false; error: PopularizeError | 'unauthorized' | 'error' };
