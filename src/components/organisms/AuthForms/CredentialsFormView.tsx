'use client';

import { useForm } from '@tanstack/react-form';
import { useLocale, useTranslations } from 'next-intl';
import { type ChangeEvent, type FormEvent } from 'react';
import { getPathname, Link, useRouter } from '@/i18n/navigation';
import { authErrorKey } from '@/lib/auth/errors';
import { authCallbackUrl } from '@/lib/auth/redirect';
import { createClient } from '@/lib/supabase/client';
import styles from './AuthForms.module.css';
import { AuthTextField, focusFirstInvalidField } from './AuthTextField';
import { fieldErrorMessage, loginSchema, registerSchema } from './schema';
import type { CredentialsFormViewProps } from './CredentialsFormView.types';

export function CredentialsFormView({
  mode,
  status = 'form',
  nextHref = '/',
  callbackFailed = false,
  formError = null,
  googlePending = false,
  onGoogle,
  onSubmitSuccess,
  onCheckEmail,
  onFormError,
}: CredentialsFormViewProps) {
  const t = useTranslations('Auth');
  const locale = useLocale();
  const router = useRouter();
  const homePath = getPathname({ locale, href: nextHref });
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
          router.replace(nextHref);
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
          router.replace(nextHref);
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
    return (
      <p className={styles.notice} role="status">
        {t('loading')}
      </p>
    );
  }

  if (status === 'checkEmail') {
    return (
      <p className={styles.notice} role="status">
        {t('checkEmail')}
      </p>
    );
  }

  function selectIsSubmitting(state: { isSubmitting: boolean }) {
    return state.isSubmitting;
  }

  function submitCredentials(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    const formElement = event.currentTarget;
    void form.handleSubmit().then(() => {
      focusFirstInvalidField(formElement);
    });
  }

  const passwordComplete =
    mode === 'login' ? 'current-password' : 'new-password';

  return (
    <div className={styles.stack}>
      <form.Subscribe selector={selectIsSubmitting}>
        {(isSubmitting) => {
          const googleDisabled = isSubmitting || googlePending;
          const googleBusy = googleDisabled || undefined;

          function startGoogle() {
            onGoogle?.();
          }

          return (
            <button
              className={styles.google}
              type="button"
              disabled={googleDisabled}
              aria-busy={googleBusy}
              onClick={startGoogle}
            >
              {t('google')}
            </button>
          );
        }}
      </form.Subscribe>
      <p className={styles.divider}>{t('or')}</p>
      <form className={styles.form} noValidate onSubmit={submitCredentials}>
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
            function changeEmail(event: ChangeEvent<HTMLInputElement>) {
              field.handleChange(event.target.value);
            }

            return (
              <AuthTextField
                label={t('email')}
                error={fieldErrorMessage(field.state.meta.errors)}
                type="email"
                name={field.name}
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={changeEmail}
              />
            );
          }}
        </form.Field>
        <form.Field name="password">
          {(field) => {
            function changePassword(event: ChangeEvent<HTMLInputElement>) {
              field.handleChange(event.target.value);
            }

            return (
              <AuthTextField
                label={t('password')}
                error={fieldErrorMessage(field.state.meta.errors)}
                type="password"
                name={field.name}
                autoComplete={passwordComplete}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={changePassword}
              />
            );
          }}
        </form.Field>
        {mode === 'register' ? (
          <form.Field name="confirmPassword">
            {(field) => {
              function changeConfirmPassword(
                event: ChangeEvent<HTMLInputElement>,
              ) {
                field.handleChange(event.target.value);
              }

              return (
                <AuthTextField
                  label={t('confirmPassword')}
                  error={fieldErrorMessage(field.state.meta.errors)}
                  type="password"
                  name={field.name}
                  autoComplete="new-password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={changeConfirmPassword}
                />
              );
            }}
          </form.Field>
        ) : null}
        <form.Subscribe selector={selectIsSubmitting}>
          {(isSubmitting) => {
            const submitDisabled = isSubmitting || googlePending;
            const submitBusy = isSubmitting || undefined;

            return (
              <button
                className={styles.button}
                type="submit"
                disabled={submitDisabled}
                aria-busy={submitBusy}
              >
                {mode === 'login' ? t('submitLogin') : t('submitRegister')}
              </button>
            );
          }}
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
