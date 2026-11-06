'use client';

import { useForm } from '@tanstack/react-form';
import { useTranslations } from 'next-intl';
import { type ChangeEvent, type FormEvent } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { authErrorKey } from '@/lib/auth/errors';
import { createClient } from '@/lib/supabase/client';
import styles from '../AuthForms.module.css';
import { AuthTextField } from '../AuthTextField/AuthTextField';
import { focusFirstInvalidField } from '../AuthTextField/AuthTextField.utils';
import { fieldErrorMessage, resetPasswordSchema } from '../schema.utils';
import type { ResetPasswordFormViewProps } from './ResetPasswordFormView.types';

export function ResetPasswordFormView({
  status,
  formError = null,
  onFormError,
  onUpdated,
}: ResetPasswordFormViewProps) {
  const t = useTranslations('Auth');
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: resetPasswordSchema({
        messages: {
          passwordShort: t('passwordShort'),
          passwordMismatch: t('passwordMismatch'),
        },
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
          onFormError?.(t(authErrorKey({ code: authError.code })));
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

  function selectIsSubmitting(state: { isSubmitting: boolean }) {
    return state.isSubmitting;
  }

  function submitResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    const formElement = event.currentTarget;
    void form.handleSubmit().then(() => {
      focusFirstInvalidField({ form: formElement });
    });
  }

  return (
    <form className={styles.stack} noValidate onSubmit={submitResetPassword}>
      {formError ? (
        <p className={styles.error} role="alert">
          {formError}
        </p>
      ) : null}
      <form.Field name="password">
        {(field) => {
          function changePassword(event: ChangeEvent<HTMLInputElement>) {
            field.handleChange(event.target.value);
          }

          return (
            <AuthTextField
              label={t('password')}
              error={fieldErrorMessage({ errors: field.state.meta.errors })}
              type="password"
              name={field.name}
              autoComplete="new-password"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={changePassword}
            />
          );
        }}
      </form.Field>
      <form.Field name="confirmPassword">
        {(field) => {
          function changeConfirmPassword(event: ChangeEvent<HTMLInputElement>) {
            field.handleChange(event.target.value);
          }

          return (
            <AuthTextField
              label={t('confirmPassword')}
              error={fieldErrorMessage({ errors: field.state.meta.errors })}
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
              {t('submitReset')}
            </button>
          );
        }}
      </form.Subscribe>
    </form>
  );
}
