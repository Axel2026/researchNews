'use client';

import { useForm } from '@tanstack/react-form';
import { useLocale, useTranslations } from 'next-intl';
import { getPathname, Link } from '@/i18n/navigation';
import { authErrorKey } from '@/lib/auth/errors';
import { authCallbackUrl } from '@/lib/auth/redirect';
import { createClient } from '@/lib/supabase/client';
import styles from './AuthForms.module.css';
import { AuthTextField, focusFirstInvalidField } from './AuthTextField';
import { fieldErrorMessage, forgotPasswordSchema } from './schema';

export type ForgotPasswordFormStatus = 'form' | 'sent';

export function ForgotPasswordFormView({
  status = 'form',
  formError = null,
  onFormError,
  onSent,
}: {
  status?: ForgotPasswordFormStatus;
  formError?: string | null;
  onFormError?: (message: string | null) => void;
  onSent?: () => void;
}) {
  const t = useTranslations('Auth');
  const locale = useLocale();

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: forgotPasswordSchema(t('emailInvalid')),
    },
    onSubmit: async ({ value }) => {
      onFormError?.(null);

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
          onFormError?.(t(authErrorKey(authError.code)));
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

  return (
    <form
      className={styles.stack}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const formElement = event.currentTarget;
        void form.handleSubmit().then(() => {
          focusFirstInvalidField(formElement);
        });
      }}
    >
      {formError ? (
        <p className={styles.error} role="alert">
          {formError}
        </p>
      ) : null}
      <form.Field name="email">
        {(field) => (
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
            onChange={(event) => field.handleChange(event.target.value)}
          />
        )}
      </form.Field>
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <button
            className={styles.button}
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting || undefined}
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
