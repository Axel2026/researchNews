'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/client';
import { publicSupabaseEnv } from '@/lib/supabase/env';
import styles from './AccountMenu.module.css';

export type AccountMenuStatus = 'pending' | 'anonymous' | 'authenticated';

export function AccountMenuView({
  status,
  email,
  onSignOut,
}: {
  status: AccountMenuStatus;
  email: string | null;
  onSignOut?: () => void;
}) {
  const t = useTranslations('Auth');

  if (status === 'pending') {
    return (
      <p className={styles.pending} aria-live="polite">
        {t('loading')}
      </p>
    );
  }

  if (status === 'authenticated') {
    return (
      <div className={styles.menu}>
        <span className={styles.email}>{email ?? t('signedIn')}</span>
        <button className={styles.action} type="button" onClick={onSignOut}>
          {t('logout')}
        </button>
      </div>
    );
  }

  return (
    <nav className={styles.menu} aria-label={t('account')}>
      <Link className={styles.action} href="/login">
        {t('login')}
      </Link>
      <Link className={styles.action} href="/register">
        {t('register')}
      </Link>
    </nav>
  );
}

export function AccountMenu() {
  const router = useRouter();
  const configured = publicSupabaseEnv() !== null;
  const [status, setStatus] = useState<AccountMenuStatus>(
    configured ? 'pending' : 'anonymous',
  );
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!configured) {
      return;
    }

    let active = true;
    const supabase = createClient();

    const apply = (nextEmail: string | null, signedIn: boolean) => {
      if (!active) {
        return;
      }

      setEmail(nextEmail);
      setStatus(signedIn ? 'authenticated' : 'anonymous');
    };

    void supabase.auth.getSession().then(
      ({ data }) => {
        apply(data.session?.user.email ?? null, Boolean(data.session));
      },
      () => {
        apply(null, false);
      },
    );

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      apply(session?.user.email ?? null, Boolean(session));
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [configured]);

  return (
    <AccountMenuView
      status={status}
      email={email}
      onSignOut={() => {
        void (async () => {
          try {
            const supabase = createClient();
            await supabase.auth.signOut();
            router.refresh();
          } catch {
            setStatus('anonymous');
            setEmail(null);
          }
        })();
      }}
    />
  );
}
