'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPathname, useRouter } from '@/i18n/navigation';
import { authErrorKey } from '@/lib/auth/errors';
import { authCallbackUrl } from '@/lib/auth/redirect';
import { createClient } from '@/lib/supabase/client';
import {
  CredentialsFormView,
  type CredentialsFormStatus,
  type CredentialsMode,
} from './CredentialsFormView';

export function CredentialsForm({ mode }: { mode: CredentialsMode }) {
  const t = useTranslations('Auth');
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formError, setFormError] = useState<string | null>(null);
  const [googlePending, setGooglePending] = useState(false);
  const [status, setStatus] = useState<CredentialsFormStatus>('form');
  const callbackFailed = searchParams.get('error') === 'auth';
  const homePath = getPathname({ locale, href: '/' });
  const loginPath = getPathname({ locale, href: '/login' });

  useEffect(() => {
    let active = true;

    try {
      const supabase = createClient();
      void supabase.auth.getSession().then(({ data }) => {
        if (!active || !data.session) {
          return;
        }

        setStatus('redirecting');
        router.replace('/');
      });
    } catch {
      return;
    }

    return () => {
      active = false;
    };
  }, [router]);

  async function signInWithGoogle() {
    setFormError(null);
    setGooglePending(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: authCallbackUrl(homePath, loginPath),
        },
      });

      if (authError) {
        setFormError(t(authErrorKey(authError.code)));
        setGooglePending(false);
      }
    } catch {
      setFormError(t('genericError'));
      setGooglePending(false);
    }
  }

  return (
    <CredentialsFormView
      mode={mode}
      status={status}
      callbackFailed={callbackFailed}
      formError={formError}
      googlePending={googlePending}
      onGoogle={() => {
        void signInWithGoogle();
      }}
      onCheckEmail={() => setStatus('checkEmail')}
      onFormError={setFormError}
    />
  );
}
