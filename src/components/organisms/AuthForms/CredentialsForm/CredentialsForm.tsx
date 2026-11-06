'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPathname, useRouter } from '@/i18n/navigation';
import { authErrorKey } from '@/lib/auth/errors';
import { authCallbackUrl, safeNextPath } from '@/lib/auth/redirect';
import { createClient } from '@/lib/supabase/client';
import { CredentialsFormView } from '../CredentialsFormView/CredentialsFormView';
import type { CredentialsFormStatus } from '../CredentialsFormView/CredentialsFormView.types';
import type { CredentialsFormProps } from './CredentialsForm.types';

export function CredentialsForm({ mode }: CredentialsFormProps) {
  const t = useTranslations('Auth');
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formError, setFormError] = useState<string | null>(null);
  const [googlePending, setGooglePending] = useState(false);
  const [status, setStatus] = useState<CredentialsFormStatus>('form');
  const callbackFailed = searchParams.get('error') === 'auth';
  const nextHref = safeNextPath({ value: searchParams.get('next') });
  const nextPath = getPathname({ locale, href: nextHref });
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
        router.replace(nextHref);
      });
    } catch {
      return;
    }

    return () => {
      active = false;
    };
  }, [nextHref, router]);

  async function signInWithGoogle() {
    setFormError(null);
    setGooglePending(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: authCallbackUrl({ nextPath, loginPath }),
        },
      });

      if (authError) {
        setFormError(t(authErrorKey({ code: authError.code })));
        setGooglePending(false);
      }
    } catch {
      setFormError(t('genericError'));
      setGooglePending(false);
    }
  }

  function handleGoogle() {
    void signInWithGoogle();
  }

  function showCheckEmail() {
    setStatus('checkEmail');
  }

  return (
    <CredentialsFormView
      mode={mode}
      status={status}
      nextHref={nextHref}
      callbackFailed={callbackFailed}
      formError={formError}
      googlePending={googlePending}
      onGoogle={handleGoogle}
      onCheckEmail={showCheckEmail}
      onFormError={setFormError}
    />
  );
}
