'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { listAiKeys } from '@/data/ai-keys';
import type { AiProvider } from '@/data/ai-keys.types';
import { popularizeArticle } from '@/data/popularize';
import type { PopularizeArticleResult } from '@/data/popularize.types';
import { revalidateArticles } from '@/data/revalidate-articles';
import { usePathname } from '@/i18n/navigation';
import { loginHref } from '@/lib/auth/redirect';
import { createClient } from '@/lib/supabase/client';
import { publicSupabaseEnv } from '@/lib/supabase/env';
import { PopularizeButtonView } from './PopularizeButtonView/PopularizeButtonView';
import type { PopularizeStatus } from './PopularizeButtonView/PopularizeButtonView.types';
import type { PopularizeButtonProps } from './PopularizeButton.types';

function failureMessage(
  error: Exclude<PopularizeArticleResult, { ok: true }>['error'],
  copy: {
    inProgress: string;
    failed: string;
    providerFailed: string;
    invalidKey: string;
    unavailable: string;
    error: string;
  },
): string {
  if (error === 'in_progress') {
    return copy.inProgress;
  }

  if (error === 'invalid_generation') {
    return copy.failed;
  }

  if (error === 'provider_error') {
    return copy.providerFailed;
  }

  if (error === 'invalid_key') {
    return copy.invalidKey;
  }

  if (
    error === 'missing_abstract' ||
    error === 'not_found' ||
    error === 'already_popularized'
  ) {
    return copy.unavailable;
  }

  return copy.error;
}

export function PopularizeButton({ slug }: PopularizeButtonProps) {
  const t = useTranslations('Popularize');
  const tAccount = useTranslations('Account');
  const tAuth = useTranslations('Auth');
  const pathname = usePathname();
  const router = useRouter();
  const configured = publicSupabaseEnv() !== null;
  const [status, setStatus] = useState<PopularizeStatus>(
    configured ? 'pending' : 'anonymous',
  );
  const [providers, setProviders] = useState<AiProvider[]>([]);
  const [provider, setProvider] = useState<AiProvider>('openai');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!configured) {
      return;
    }

    let active = true;
    const supabase = createClient();

    async function load() {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        if (active) {
          setStatus('anonymous');
          setProviders([]);
        }
        return;
      }

      try {
        const list = await listAiKeys({ accessToken: token });
        if (!active) {
          return;
        }

        const saved = list.keys.map((key) => key.provider);
        setProviders(saved);
        const first = saved[0];
        if (first) {
          setProvider(first);
          setStatus('ready');
          return;
        }

        setStatus('needs-key');
      } catch {
        if (active) {
          setStatus('anonymous');
        }
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [configured, slug]);

  const copy = {
    action: t('action'),
    pending: t('pending'),
    signIn: t('signIn'),
    needsKey: t('needsKey'),
    provider: t('provider'),
    loading: tAuth('loading'),
    providers: {
      openai: tAccount('openai'),
      xai: tAccount('xai'),
      anthropic: tAccount('anthropic'),
    },
  };
  const errors = {
    inProgress: t('inProgress'),
    failed: t('failed'),
    providerFailed: t('providerFailed'),
    invalidKey: t('invalidKey'),
    unavailable: t('unavailable'),
    error: tAuth('genericError'),
  };

  async function popularize() {
    if (status !== 'ready') {
      return;
    }

    setMessage(null);
    setStatus('busy');
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) {
      setStatus('anonymous');
      return;
    }

    const result = await popularizeArticle({
      slug,
      provider,
      accessToken: token,
    });

    if (result.ok || result.error === 'already_popularized') {
      await revalidateArticles();
      router.refresh();
      setStatus('ready');
      return;
    }

    if (result.error === 'missing_key') {
      setStatus('needs-key');
      return;
    }

    if (result.error === 'unauthorized') {
      setStatus('anonymous');
      return;
    }

    setMessage(failureMessage(result.error, errors));
    setStatus('ready');
  }

  function changeProvider(value: string) {
    setProvider(value as AiProvider);
  }

  function handlePopularize() {
    void popularize();
  }

  return (
    <PopularizeButtonView
      status={status}
      providers={providers}
      provider={provider}
      message={message}
      signInHref={loginHref({ nextPath: pathname })}
      accountHref="/account"
      copy={copy}
      onProviderChange={changeProvider}
      onPopularize={handlePopularize}
    />
  );
}
