'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { listBookmarks, setBookmark } from '@/data/bookmarks';
import { usePathname } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing.types';
import { createClient } from '@/lib/supabase/client';
import { publicSupabaseEnv } from '@/lib/supabase/env';
import { BookmarkButtonView } from './BookmarkButtonView/BookmarkButtonView';
import type { BookmarkButtonStatus } from './BookmarkButtonView/BookmarkButtonView.types';
import type { BookmarkButtonProps } from './BookmarkButton.types';

export function BookmarkButton({ slug }: BookmarkButtonProps) {
  const t = useTranslations();
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const configured = publicSupabaseEnv() !== null;
  const [status, setStatus] = useState<BookmarkButtonStatus>(
    configured ? 'pending' : 'anonymous',
  );
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!configured) {
      return;
    }

    let active = true;
    const supabase = createClient();

    async function load() {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if (!token) {
        if (active) {
          setStatus('anonymous');
        }
        return;
      }

      try {
        const bookmarks = await listBookmarks({ locale, accessToken: token });
        if (active) {
          setStatus(bookmarks.slugs.includes(slug) ? 'saved' : 'unsaved');
        }
      } catch {
        if (active) {
          setStatus('anonymous');
        }
      }
    }

    void load();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setStatus('anonymous');
        return;
      }

      void load();
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [configured, locale, slug]);

  const copy = {
    add: t('Bookmarks.add'),
    remove: t('Bookmarks.remove'),
    signIn: t('Bookmarks.signIn'),
    loading: t('Auth.loading'),
  };

  async function toggleBookmark() {
    if (busy || (status !== 'saved' && status !== 'unsaved')) {
      return;
    }

    setBusy(true);

    try {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if (!token) {
        setStatus('anonymous');
        return;
      }

      const next = status !== 'saved';
      const result = await setBookmark({
        slug,
        bookmarked: next,
        accessToken: token,
      });
      setStatus(result.bookmarked ? 'saved' : 'unsaved');
    } catch {
      /* keep the previous bookmark state */
    } finally {
      setBusy(false);
    }
  }

  function handleToggle() {
    void toggleBookmark();
  }

  return (
    <BookmarkButtonView
      status={status}
      nextPath={pathname}
      busy={busy}
      copy={copy}
      onToggle={handleToggle}
    />
  );
}
