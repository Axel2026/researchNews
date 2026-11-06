'use client';

import { useForm } from '@tanstack/react-form';
import { useLocale, useTranslations } from 'next-intl';
import { type ChangeEvent, type FormEvent } from 'react';
import { getPathname, Link } from '@/i18n/navigation';
import { authErrorKey } from '@/lib/auth/errors';
import { authCallbackUrl } from '@/lib/auth/redirect';
import { createClient } from '@/lib/supabase/client';
import styles from '../AuthForms.module.css';
import { AuthTextField } from '../AuthTextField/AuthTextField';
import { focusFirstInvalidField } from '../AuthTextField/AuthTextField.utils';
import { fieldErrorMessage, forgotPasswordSchema } from '../schema.utils';
import type { ForgotPasswordFormViewProps } from './ForgotPasswordFormView.types';

export function ForgotPasswordFormView({
  status = 'form',
  formError = null,
  onFormError,
  onSent,
}: ForgotPasswordFormViewProps) {
  const t = useTranslations('Auth');
  const locale = useLocale();

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: forgotPasswordSchema({ emailInvalid: t('emailInvalid') }),
    },
    onSubmit: async ({ value }) => {
      onFormError?.(null);

      try {
        const supabase = createClient();
        const { error: authError } = await supabase.auth.resetPasswordForEmail(
          value.email,
          {
            redirectTo: authCallbackUrl({
              nextPath: getPathname({ locale, href: '/reset-password' }),
              loginPath: getPathname({ locale, href: '/login' }),
            }),
          },
        );

        if (
          authError &&
          (authError.code === 'over_request_rate_limit' ||
            authError.code === 'over_email_send_rate_limit')
        ) {
          onFormError?.(t(authErrorKey({ code: authError.code })));
          return;
        }

        onSent?.();
      } catch {
        onFormError?.(t('genericError'));
      }
    },
  });

  if (status === 'sent') {
    return (
      <p className={styles.notice} role="status">
        {t('forgotSent')}
      </p>
    );
  }

  function selectIsSubmitting(state: { isSubmitting: boolean }) {
    return state.isSubmitting;
  }

  function submitForgotPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    const formElement = event.currentTarget;
    void form.handleSubmit().then(() => {
      focusFirstInvalidField({ form: formElement });
    });
  }

  return (
    <form className={styles.stack} noValidate onSubmit={submitForgotPassword}>
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
              error={fieldErrorMessage({ errors: field.state.meta.errors })}
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
      <form.Subscribe selector={selectIsSubmitting}>
        {(isSubmitting) => {
          const submitBusy = isSubmitting || undefined;

          return (
            <button
              className={styles.button}
              type="submit"
              disabled={isSubmitting}
              aria-busy={submitBusy}
            >
              {t('submitForgot')}
            </button>
          );
        }}
      </form.Subscribe>
      <p className={styles.links}>
        <Link className={styles.textLink} href="/login">
          {t('login')}
        </Link>
      </p>
    </form>
  );
}
