'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/client';
import { publicSupabaseEnv } from '@/lib/supabase/env';
import { AccountMenuView, type AccountMenuStatus } from './AccountMenuView';

export function AccountMenu() {
  const router = useRouter();
  const configured = publicSupabaseEnv() !== null;
  const [status, setStatus] = useState<AccountMenuStatus>(
    configured ? 'pending' : 'anonymous',
  );

  useEffect(() => {
    if (!configured) {
      return;
    }

    let active = true;
    const supabase = createClient();

    const apply = (signedIn: boolean) => {
      if (!active) {
        return;
      }

      setStatus(signedIn ? 'authenticated' : 'anonymous');
    };

    void supabase.auth.getSession().then(
      ({ data }) => {
        apply(Boolean(data.session));
      },
      () => {
        apply(false);
      },
    );

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      apply(Boolean(session));
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [configured]);

  return (
    <AccountMenuView
      status={status}
      onSignOut={() => {
        void (async () => {
          try {
            const supabase = createClient();
            await supabase.auth.signOut();
            router.refresh();
          } catch {
            setStatus('anonymous');
          }
        })();
      }}
    />
  );
}
