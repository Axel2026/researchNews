'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { publicSupabaseEnv } from '@/lib/supabase/env';
import { ResetPasswordFormView } from './ResetPasswordFormView';
import type { ResetPasswordFormStatus } from './ResetPasswordFormView.types';

export function ResetPasswordForm() {
  const configured = publicSupabaseEnv() !== null;
  const [formError, setFormError] = useState<string | null>(null);
  const [ready, setReady] = useState(!configured);
  const [hasSession, setHasSession] = useState(false);
  const [updated, setUpdated] = useState(false);

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

  const status: ResetPasswordFormStatus = !ready
    ? 'loading'
    : !hasSession
      ? 'missing'
      : updated
        ? 'updated'
        : 'form';

  function markUpdated() {
    setUpdated(true);
  }

  return (
    <ResetPasswordFormView
      status={status}
      formError={formError}
      onFormError={setFormError}
      onUpdated={markUpdated}
    />
  );
}
