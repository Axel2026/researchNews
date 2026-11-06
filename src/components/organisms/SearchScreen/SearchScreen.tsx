'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/atoms/Button/Button';
import { Input } from '@/components/atoms/Field/Input';
import { Loader } from '@/components/atoms/Loader/Loader';
import {
  ArticleFilters,
  type ArticleFilterValues,
} from '@/components/molecules/ArticleFilters/ArticleFilters';
import { ArticleListing } from '@/components/templates/ArticleListing/ArticleListing';
import {
  searchArticles,
  type ArticleCategory,
  type ArticleListItem,
  type ArticleSearchParams,
} from '@/data/articles';
import { useRouter } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import styles from './SearchScreen.module.css';

const SEARCH_DEBOUNCE_MS = 400;

const emptyFilters: ArticleFilterValues = {
  field: '',
  sort: 'newest',
  author: '',
  from: '',
  to: '',
};

function searchHref(params: ArticleSearchParams) {
  const query: Record<string, string> = {};

  if (params.query) {
    query.q = params.query;
  }

  if (params.field) {
    query.field = params.field;
  }

  if (params.sort === 'popular') {
    query.sort = 'popular';
  }

  if (params.author) {
    query.author = params.author;
  }

  if (params.from) {
    query.from = params.from;
  }

  if (params.to) {
    query.to = params.to;
  }

  if (Object.keys(query).length === 0) {
    return '/search' as const;
  }

  return {
    pathname: '/search' as const,
    query,
  };
}

function searchKey(params: ArticleSearchParams) {
  return JSON.stringify(params);
}

function isInvalidRange(from: string, to: string) {
  if (!from || !to) {
    return false;
  }

  try {
    return (
      Temporal.PlainDate.compare(
        Temporal.PlainDate.from(from),
        Temporal.PlainDate.from(to),
      ) > 0
    );
  } catch {
    return true;
  }
}

export function SearchScreen({
  locale,
  categories,
  initialQuery,
  initialFilters,
}: {
  locale: AppLocale;
  categories: ArticleCategory[];
  initialQuery: string;
  initialFilters: ArticleFilterValues;
}) {
  const t = useTranslations('Search');
  const tFilters = useTranslations('Filters');
  const tStatus = useTranslations('Status');
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);
  const [filters, setFilters] = useState(initialFilters);
  const [dateError, setDateError] = useState<string | undefined>();
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const requestId = useRef(0);
  const fetchedKey = useRef<string | null>(null);
  const queryRef = useRef(initialQuery);
  const filtersRef = useRef(initialFilters);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    queryRef.current = value;
  }, [value]);

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  function snapshot(): ArticleSearchParams {
    return {
      query: queryRef.current.trim(),
      field: filtersRef.current.field,
      sort: filtersRef.current.sort,
      author: filtersRef.current.author.trim(),
      from: filtersRef.current.from,
      to: filtersRef.current.to,
    };
  }

  function runSearch() {
    const params = snapshot();

    if (isInvalidRange(params.from, params.to)) {
      setDateError(tFilters('badRange'));
      return;
    }

    setDateError(undefined);

    const key = searchKey(params);
    if (fetchedKey.current === key) {
      return;
    }

    fetchedKey.current = key;
    const id = ++requestId.current;
    setLoading(true);
    setFailed(false);
    router.replace(searchHref(params));

    void searchArticles(locale, params)
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

        fetchedKey.current = null;
        setFailed(true);
      })
      .finally(() => {
        if (id === requestId.current) {
          setLoading(false);
        }
      });
  }

  function scheduleSearch() {
    window.clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      runSearch();
    }, SEARCH_DEBOUNCE_MS);
  }

  function searchNow() {
    window.clearTimeout(debounceTimer.current);
    runSearch();
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only fetch
    runSearch();

    return () => {
      window.clearTimeout(debounceTimer.current);
    };
    // Later searches come from typing, filters and submit.
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
            searchNow();
          }}
        >
          <Input
            id="search-query"
            label={t('label')}
            type="search"
            value={value}
            placeholder={t('placeholder')}
            autoComplete="off"
            maxLength={200}
            enterKeyHint="search"
            onChange={(event) => {
              const next = event.target.value;
              queryRef.current = next;
              setValue(next);
              scheduleSearch();
            }}
            action={<Button type="submit">{t('submit')}</Button>}
          />
          <ArticleFilters
            categories={categories}
            values={filters}
            dateError={dateError}
            onChange={(next) => {
              const previous = filtersRef.current;
              filtersRef.current = next;
              setFilters(next);
              const onlyAuthor =
                next.author !== previous.author &&
                next.field === previous.field &&
                next.sort === previous.sort &&
                next.from === previous.from &&
                next.to === previous.to;

              if (onlyAuthor) {
                scheduleSearch();
                return;
              }

              searchNow();
            }}
            onClear={() => {
              filtersRef.current = emptyFilters;
              setFilters(emptyFilters);
              searchNow();
            }}
          />
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
