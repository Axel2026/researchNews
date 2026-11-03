'use client';

import { useForm } from '@tanstack/react-form';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { authErrorKey } from '@/lib/auth/errors';
import { createClient } from '@/lib/supabase/client';
import { publicSupabaseEnv } from '@/lib/supabase/env';
import styles from './AuthForms.module.css';
import { fieldErrorMessage, resetPasswordSchema } from './schema';

export function ResetPasswordForm() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const configured = publicSupabaseEnv() !== null;
  const [formError, setFormError] = useState<string | null>(null);
  const [ready, setReady] = useState(!configured);
  const [hasSession, setHasSession] = useState(false);
  const [updated, setUpdated] = useState(false);

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
      setFormError(null);

      try {
        const supabase = createClient();
        const { error: authError } = await supabase.auth.updateUser({
          password: value.password,
        });

        if (authError) {
          setFormError(t(authErrorKey(authError.code)));
          return;
        }

        setUpdated(true);
        router.refresh();
      } catch {
        setFormError(t('genericError'));
      }
    },
  });

  useEffect(() => {
    if (!configured) {
      return;
    }

    let active = true;
    const supabase = createClient();

    void supabase.auth.getSession().then(
      ({ data }) => {
        if (!active) {
          return;
        }

        setHasSession(Boolean(data.session));
        setReady(true);
      },
      () => {
        if (!active) {
          return;
        }

        setHasSession(false);
        setReady(true);
      },
    );

    return () => {
      active = false;
    };
  }, [configured]);

  if (!ready) {
    return <p className={styles.notice}>{t('loading')}</p>;
  }

  if (!hasSession) {
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

  if (updated) {
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
        void form.handleSubmit();
      }}
    >
      {formError ? (
        <p className={styles.error} role="alert">
          {formError}
        </p>
      ) : null}
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
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <button
            className={styles.button}
            type="submit"
            disabled={isSubmitting}
          >
            {t('submitReset')}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
