'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { deleteAiKey, listAiKeys, saveAiKey } from '@/data/ai-keys';
import type { AiProvider, StoredAiKey } from '@/data/ai-keys.types';
import { defaultAiModel } from '@/data/ai-models';
import { createClient } from '@/lib/supabase/client';
import { AccountPanelView } from './AccountPanelView/AccountPanelView';
import type { AccountPanelStatus } from './AccountPanelView/AccountPanelView.types';

export function AccountPanel() {
  const t = useTranslations('Account');
  const tAuth = useTranslations('Auth');
  const [keys, setKeys] = useState<StoredAiKey[]>([]);
  const [provider, setProvider] = useState<AiProvider>('openai');
  const [model, setModel] = useState(defaultAiModel('openai'));
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState<AccountPanelStatus>('loading');
  const providerRef = useRef(provider);

  useEffect(() => {
    providerRef.current = provider;
  }, [provider]);

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    async function load() {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        if (active) {
          setStatus('error');
        }
        return;
      }

      try {
        const list = await listAiKeys({ accessToken: token });
        if (active) {
          setKeys(list.keys);
          const saved = list.keys.find(
            (key) => key.provider === providerRef.current,
          );
          if (saved) {
            setModel(saved.model);
          }
          setStatus('idle');
        }
      } catch {
        if (active) {
          setStatus('error');
        }
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, []);

  const copy = {
    provider: t('provider'),
    model: t('model'),
    apiKey: t('apiKey'),
    save: t('save'),
    remove: t('remove'),
    saved: t('saved'),
    removed: t('removed'),
    empty: t('empty'),
    listHeading: t('listHeading'),
    listEmpty: t('listEmpty'),
    editSaved: (name: string) => t('editSaved', { name }),
    current: (last4: string) => t('current', { last4 }),
    invalid: t('invalid'),
    error: t('error'),
    loading: tAuth('loading'),
    providers: {
      openai: t('openai'),
      xai: t('xai'),
      anthropic: t('anthropic'),
    },
  };

  async function tokenOrNull(): Promise<string | null> {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }

  async function save() {
    const token = await tokenOrNull();
    if (!token) {
      setStatus('error');
      return;
    }

    setStatus('saving');
    const trimmed = apiKey.trim();
    const result = await saveAiKey({
      provider,
      model,
      ...(trimmed ? { apiKey: trimmed } : {}),
      accessToken: token,
    });
    if (!result.ok) {
      setStatus(result.error === 'invalid' ? 'invalid' : 'error');
      return;
    }

    const next = result.key;
    setKeys((current) => [
      ...current.filter((key) => key.provider !== provider),
      ...(next ? [next] : []),
    ]);
    setApiKey('');
    setStatus('saved');
  }

  async function remove() {
    const token = await tokenOrNull();
    if (!token) {
      setStatus('error');
      return;
    }

    setStatus('removing');
    const result = await deleteAiKey({ provider, accessToken: token });
    if (!result.ok) {
      setStatus('error');
      return;
    }

    setKeys((current) => current.filter((key) => key.provider !== provider));
    setApiKey('');
    setModel(defaultAiModel(provider));
    setStatus('removed');
  }

  function changeProvider(value: string) {
    const next = value as AiProvider;
    providerRef.current = next;
    const saved = keys.find((key) => key.provider === next);
    setProvider(next);
    setModel(saved?.model ?? defaultAiModel(next));
    setApiKey('');
    setStatus('idle');
  }

  function changeModel(value: string) {
    setModel(value);
    if (
      status === 'saved' ||
      status === 'removed' ||
      status === 'invalid' ||
      status === 'error'
    ) {
      setStatus('idle');
    }
  }

  function changeKey(value: string) {
    setApiKey(value);
    if (
      status === 'saved' ||
      status === 'removed' ||
      status === 'invalid' ||
      status === 'error'
    ) {
      setStatus('idle');
    }
  }

  function handleSave() {
    void save();
  }

  function handleRemove() {
    void remove();
  }

  return (
    <AccountPanelView
      keys={keys}
      provider={provider}
      model={model}
      apiKey={apiKey}
      status={status}
      copy={copy}
      onProviderChange={changeProvider}
      onModelChange={changeModel}
      onApiKeyChange={changeKey}
      onSave={handleSave}
      onRemove={handleRemove}
    />
  );
}
