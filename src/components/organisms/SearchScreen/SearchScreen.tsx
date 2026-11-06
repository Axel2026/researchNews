'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/atoms/Button/Button';
import { Loader } from '@/components/atoms/Loader/Loader';
import { ArticleListing } from '@/components/templates/ArticleListing/ArticleListing';
import { searchArticles, type ArticleListItem } from '@/data/articles';
import { useRouter } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import styles from './SearchScreen.module.css';

const SEARCH_DEBOUNCE_MS = 400;

function searchHref(query: string) {
  if (!query) {
    return '/search' as const;
  }

  return {
    pathname: '/search' as const,
    query: { q: query },
  };
}

export function SearchScreen({
  locale,
  initialQuery,
}: {
  locale: AppLocale;
  initialQuery: string;
}) {
  const t = useTranslations('Search');
  const tStatus = useTranslations('Status');
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const requestId = useRef(0);
  const fetchedQuery = useRef<string | null>(null);
  const valueRef = useRef(value);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  function runSearch(raw: string) {
    const query = raw.trim();

    if (fetchedQuery.current === query) {
      return;
    }

    fetchedQuery.current = query;
    const id = ++requestId.current;
    setLoading(true);
    setFailed(false);
    router.replace(searchHref(query));

    void searchArticles(locale, query)
      .then((results) => {
        if (id !== requestId.current) {
          return;
        }

        setArticles(results);
      })
      .catch(() => {
        if (id !== requestId.current) {
          return;
        }

        fetchedQuery.current = null;
        setFailed(true);
      })
      .finally(() => {
        if (id === requestId.current) {
          setLoading(false);
        }
      });
  }

  useEffect(() => {
    runSearch(initialQuery);

    return () => {
      window.clearTimeout(debounceTimer.current);
    };
    // Later searches come from typing and submit.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only fetch
  }, []);

  return (
    <ArticleListing
      kicker={t('kicker')}
      title={t('title')}
      headingId="search-heading"
      dek={t('dek')}
      empty={t('empty')}
      articles={articles}
      locale={locale}
      toolbar={
        <form
          className={styles.field}
          onSubmit={(event) => {
            event.preventDefault();
            window.clearTimeout(debounceTimer.current);
            runSearch(valueRef.current);
          }}
        >
          <label className={styles.label} htmlFor="search-query">
            {t('label')}
          </label>
          <div className={styles.row}>
            <input
              id="search-query"
              className={styles.input}
              type="search"
              value={value}
              placeholder={t('placeholder')}
              autoComplete="off"
              maxLength={200}
              onChange={(event) => {
                const next = event.target.value;
                valueRef.current = next;
                setValue(next);
                window.clearTimeout(debounceTimer.current);
                debounceTimer.current = setTimeout(() => {
                  runSearch(valueRef.current);
                }, SEARCH_DEBOUNCE_MS);
              }}
            />
            <Button type="submit">{t('submit')}</Button>
          </div>
        </form>
      }
      status={
        loading ? (
          <Loader label={tStatus('loading')} />
        ) : failed ? (
          <p className={styles.error}>{tStatus('error')}</p>
        ) : undefined
      }
    />
  );
}
