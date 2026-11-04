'use client';

import { useForm } from '@tanstack/react-form';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { authErrorKey } from '@/lib/auth/errors';
import { createClient } from '@/lib/supabase/client';
import styles from './AuthForms.module.css';
import { AuthTextField, focusFirstInvalidField } from './AuthTextField';
import { fieldErrorMessage, resetPasswordSchema } from './schema';

export type ResetPasswordFormStatus =
  'loading' | 'missing' | 'form' | 'updated';

export function ResetPasswordFormView({
  status,
  formError = null,
  onFormError,
  onUpdated,
}: {
  status: ResetPasswordFormStatus;
  formError?: string | null;
  onFormError?: (message: string | null) => void;
  onUpdated?: () => void;
}) {
  const t = useTranslations('Auth');
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: resetPasswordSchema({
        passwordShort: t('passwordShort'),
        passwordMismatch: t('passwordMismatch'),
      }),
    },
    onSubmit: async ({ value }) => {
      onFormError?.(null);

      try {
        const supabase = createClient();
        const { error: authError } = await supabase.auth.updateUser({
          password: value.password,
        });

        if (authError) {
          onFormError?.(t(authErrorKey(authError.code)));
          return;
        }

        onUpdated?.();
        router.refresh();
      } catch {
        onFormError?.(t('genericError'));
      }
    },
  });

  if (status === 'loading') {
    return (
      <p className={styles.notice} role="status">
        {t('loading')}
      </p>
    );
  }

  if (status === 'missing') {
    return (
      <div className={styles.notice}>
        <p role="alert">{t('resetMissing')}</p>
        <p className={styles.links}>
          <Link className={styles.textLink} href="/forgot-password">
            {t('requestNewLink')}
          </Link>
        </p>
      </div>
    );
  }

  if (status === 'updated') {
    return (
      <div className={styles.notice} role="status">
        <p>{t('passwordUpdated')}</p>
        <p className={styles.links}>
          <Link className={styles.textLink} href="/">
            {t('backHome')}
          </Link>
        </p>
      </div>
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
      <form.Field name="password">
        {(field) => (
          <AuthTextField
            label={t('password')}
            error={fieldErrorMessage(field.state.meta.errors)}
            type="password"
            name={field.name}
            autoComplete="new-password"
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(event) => field.handleChange(event.target.value)}
          />
        )}
      </form.Field>
      <form.Field name="confirmPassword">
        {(field) => (
          <AuthTextField
            label={t('confirmPassword')}
            error={fieldErrorMessage(field.state.meta.errors)}
            type="password"
            name={field.name}
            autoComplete="new-password"
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
            {t('submitReset')}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
