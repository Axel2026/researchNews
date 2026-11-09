import { apiUrl } from '@/lib/api';
import type {
  AiKeyList,
  DeleteAiKeyParams,
  ListAiKeysParams,
  SaveAiKeyParams,
  SaveAiKeyResult,
  StoredAiKey,
} from './ai-keys.types';

export async function listAiKeys({
  accessToken,
}: ListAiKeysParams): Promise<AiKeyList> {
  const response = await fetch(new URL('/me/ai-keys', apiUrl()), {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status === 401) {
    throw new Error('unauthorized');
  }

  if (!response.ok) {
    throw new Error('error');
  }

  return response.json() as Promise<AiKeyList>;
}

export async function saveAiKey({
  provider,
  model,
  apiKey,
  accessToken,
}: SaveAiKeyParams): Promise<SaveAiKeyResult> {
  const response = await fetch(new URL('/me/ai-keys', apiUrl()), {
    method: 'PUT',
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      provider,
      model,
      ...(apiKey ? { apiKey } : {}),
    }),
  });

  if (response.status === 401) {
    return { ok: false, error: 'unauthorized' };
  }

  if (response.status === 400) {
    return { ok: false, error: 'invalid' };
  }

  if (!response.ok) {
    return { ok: false, error: 'error' };
  }

  const key = (await response.json()) as StoredAiKey;
  return { ok: true, key };
}

export async function deleteAiKey({
  provider,
  accessToken,
}: DeleteAiKeyParams): Promise<SaveAiKeyResult> {
  const response = await fetch(new URL(`/me/ai-keys/${provider}`, apiUrl()), {
    method: 'DELETE',
    cache: 'no-store',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status === 401) {
    return { ok: false, error: 'unauthorized' };
  }

  if (!response.ok) {
    return { ok: false, error: 'error' };
  }

  return { ok: true, key: null };
}
