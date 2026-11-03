'use client';

import { useForm } from '@tanstack/react-form';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { getPathname, Link } from '@/i18n/navigation';
import { authErrorKey } from '@/lib/auth/errors';
import { authCallbackUrl } from '@/lib/auth/redirect';
import { createClient } from '@/lib/supabase/client';
import styles from './AuthForms.module.css';
import { fieldErrorMessage, forgotPasswordSchema } from './schema';

export function ForgotPasswordForm() {
  const t = useTranslations('Auth');
  const locale = useLocale();
  const [formError, setFormError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: forgotPasswordSchema(t('emailInvalid')),
    },
    onSubmit: async ({ value }) => {
      setFormError(null);

      try {
        const supabase = createClient();
        const { error: authError } = await supabase.auth.resetPasswordForEmail(
          value.email,
          {
            redirectTo: authCallbackUrl(
              getPathname({ locale, href: '/reset-password' }),
              getPathname({ locale, href: '/login' }),
            ),
          },
        );

        if (
          authError &&
          (authError.code === 'over_request_rate_limit' ||
            authError.code === 'over_email_send_rate_limit')
        ) {
          setFormError(t(authErrorKey(authError.code)));
          return;
        }

        setSent(true);
      } catch {
        setFormError(t('genericError'));
      }
    },
  });

  if (sent) {
    return (
      <p className={styles.notice} role="status">
        {t('forgotSent')}
      </p>
    );
  }

  return (
    <form
      className={styles.stack}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
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
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <button
            className={styles.button}
            type="submit"
            disabled={isSubmitting}
          >
            {t('submitForgot')}
          </button>
        )}
      </form.Subscribe>
      <p className={styles.links}>
        <Link className={styles.textLink} href="/login">
          {t('login')}
        </Link>
      </p>
    </form>
  );
}
