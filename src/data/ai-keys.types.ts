export const AI_PROVIDERS = ['openai', 'xai', 'anthropic'] as const;

export type AiProvider = (typeof AI_PROVIDERS)[number];

export type StoredAiKey = {
  provider: AiProvider;
  model: string;
  last4: string;
  updatedAt: string;
};

export type AiKeyList = {
  keys: StoredAiKey[];
};

export type ListAiKeysParams = {
  accessToken: string;
};

export type SaveAiKeyParams = {
  provider: AiProvider;
  model: string;
  apiKey?: string;
  accessToken: string;
};

export type DeleteAiKeyParams = {
  provider: AiProvider;
  accessToken: string;
};

export type SaveAiKeyResult =
  | { ok: true; key: StoredAiKey | null }
  | { ok: false; error: 'unauthorized' | 'invalid' | 'error' };
