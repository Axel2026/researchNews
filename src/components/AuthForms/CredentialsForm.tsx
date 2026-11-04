'use client';

import { useForm } from '@tanstack/react-form';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPathname, Link, useRouter } from '@/i18n/navigation';
import { authErrorKey } from '@/lib/auth/errors';
import { authCallbackUrl } from '@/lib/auth/redirect';
import { createClient } from '@/lib/supabase/client';
import styles from './AuthForms.module.css';
import { fieldErrorMessage, loginSchema, registerSchema } from './schema';

type CredentialsMode = 'login' | 'register';

export type CredentialsFormStatus = 'form' | 'checkEmail' | 'redirecting';

export function CredentialsFormView({
  mode,
  status = 'form',
  callbackFailed = false,
  formError = null,
  googlePending = false,
  onGoogle,
  onSubmitSuccess,
  onCheckEmail,
  onFormError,
}: {
  mode: CredentialsMode;
  status?: CredentialsFormStatus;
  callbackFailed?: boolean;
  formError?: string | null;
  googlePending?: boolean;
  onGoogle?: () => void;
  onSubmitSuccess?: () => void;
  onCheckEmail?: () => void;
  onFormError?: (message: string | null) => void;
}) {
  const t = useTranslations('Auth');
  const locale = useLocale();
  const router = useRouter();
  const homePath = getPathname({ locale, href: '/' });
  const loginPath = getPathname({ locale, href: '/login' });
  const messages = {
    emailInvalid: t('emailInvalid'),
    passwordShort: t('passwordShort'),
    passwordMismatch: t('passwordMismatch'),
  };

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit:
        mode === 'login' ? loginSchema(messages) : registerSchema(messages),
    },
    onSubmit: async ({ value }) => {
      onFormError?.(null);

      try {
        const supabase = createClient();

        if (mode === 'login') {
          const { error: authError } = await supabase.auth.signInWithPassword({
            email: value.email,
            password: value.password,
          });

          if (authError) {
            onFormError?.(t(authErrorKey(authError.code)));
            return;
          }

          onSubmitSuccess?.();
          router.replace('/');
          router.refresh();
          return;
        }

        const { data, error: authError } = await supabase.auth.signUp({
          email: value.email,
          password: value.password,
          options: {
            emailRedirectTo: authCallbackUrl(homePath, loginPath),
          },
        });

        if (authError) {
          onFormError?.(t(authErrorKey(authError.code)));
          return;
        }

        if (data.user && data.user.identities?.length === 0) {
          onFormError?.(t('userExists'));
          return;
        }

        if (data.session) {
          onSubmitSuccess?.();
          router.replace('/');
          router.refresh();
          return;
        }

        onCheckEmail?.();
      } catch {
        onFormError?.(t('genericError'));
      }
    },
  });

  if (status === 'redirecting') {
    return <p className={styles.notice}>{t('loading')}</p>;
  }

  if (status === 'checkEmail') {
    return (
      <p className={styles.notice} role="status">
        {t('checkEmail')}
      </p>
    );
  }

  return (
    <div className={styles.stack}>
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <button
            className={styles.google}
            type="button"
            disabled={isSubmitting || googlePending}
            onClick={() => {
              onGoogle?.();
            }}
          >
            {t('google')}
          </button>
        )}
      </form.Subscribe>
      <p className={styles.divider}>{t('or')}</p>
      <form
        className={styles.form}
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        {callbackFailed ? (
          <p className={styles.error} role="alert">
            {t('callbackError')}
          </p>
        ) : null}
        {formError ? (
          <p className={styles.error} role="alert">
            {formError}
          </p>
        ) : null}
        <form.Field name="email">
          {(field) => {
            const message = fieldErrorMessage(field.state.meta.errors);

            return (
              <label className={styles.label}>
                {t('email')}
                <input
                  className={styles.input}
                  type="email"
                  name={field.name}
                  autoComplete="email"
                  spellCheck={false}
                  value={field.state.value}
                  aria-invalid={message ? true : undefined}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                {message ? (
                  <span className={styles.fieldError}>{message}</span>
                ) : null}
              </label>
            );
          }}
        </form.Field>
        <form.Field name="password">
          {(field) => {
            const message = fieldErrorMessage(field.state.meta.errors);

            return (
              <label className={styles.label}>
                {t('password')}
                <input
                  className={styles.input}
                  type="password"
                  name={field.name}
                  autoComplete={
                    mode === 'login' ? 'current-password' : 'new-password'
                  }
                  value={field.state.value}
                  aria-invalid={message ? true : undefined}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                {message ? (
                  <span className={styles.fieldError}>{message}</span>
                ) : null}
              </label>
            );
          }}
        </form.Field>
        {mode === 'register' ? (
          <form.Field name="confirmPassword">
            {(field) => {
              const message = fieldErrorMessage(field.state.meta.errors);

              return (
                <label className={styles.label}>
                  {t('confirmPassword')}
                  <input
                    className={styles.input}
                    type="password"
                    name={field.name}
                    autoComplete="new-password"
                    value={field.state.value}
                    aria-invalid={message ? true : undefined}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                  {message ? (
                    <span className={styles.fieldError}>{message}</span>
                  ) : null}
                </label>
              );
            }}
          </form.Field>
        ) : null}
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <button
              className={styles.button}
              type="submit"
              disabled={isSubmitting || googlePending}
            >
              {mode === 'login' ? t('submitLogin') : t('submitRegister')}
            </button>
          )}
        </form.Subscribe>
      </form>
      <p className={styles.links}>
        {mode === 'login' ? (
          <>
            <Link className={styles.textLink} href="/forgot-password">
              {t('forgotLink')}
            </Link>
            <Link className={styles.textLink} href="/register">
              {t('noAccount')}
            </Link>
          </>
        ) : (
          <Link className={styles.textLink} href="/login">
            {t('hasAccount')}
          </Link>
        )}
      </p>
    </div>
  );
}

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
