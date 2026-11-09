'use client';

import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/atoms/Button/Button';
import { Input } from '@/components/atoms/Field/Input/Input';
import { Loader } from '@/components/atoms/Loader/Loader';
import { ArticleFilters } from '@/components/molecules/ArticleFilters/ArticleFilters';
import type { ArticleFilterValues } from '@/components/molecules/ArticleFilters/ArticleFilters.types';
import { Pagination } from '@/components/molecules/Pagination/Pagination';
import { paginationCount } from '@/components/molecules/Pagination/Pagination.utils';
import { ArticleListing } from '@/components/templates/ArticleListing/ArticleListing';
import { searchArticles } from '@/data/articles';
import type {
  ArticleListItem,
  ArticleSearchParams,
} from '@/data/articles.types';
import { useRouter } from '@/i18n/navigation';
import { debounce } from '@/lib/debounce';
import type { Debounced } from '@/lib/debounce.types';
import styles from './SearchScreen.module.css';
import type { SearchScreenProps } from './SearchScreen.types';
import { isInvalidRange, searchHref, searchKey } from './SearchScreen.utils';

const SEARCH_DEBOUNCE_MS = 400;

const emptyFilters: ArticleFilterValues = {
  field: '',
  sort: 'newest',
  author: '',
  from: '',
  to: '',
};

export function SearchScreen({
  locale,
  categories,
  initialQuery,
  initialFilters,
  initialPage,
}: SearchScreenProps) {
  const t = useTranslations('Search');
  const tFilters = useTranslations('Filters');
  const tStatus = useTranslations('Status');
  const tPagination = useTranslations('Pagination');
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);
  const [filters, setFilters] = useState(initialFilters);
  const [dateError, setDateError] = useState<string | undefined>();
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [pageInfo, setPageInfo] = useState({
    page: initialPage,
    pageSize: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const requestId = useRef(0);
  const pageRef = useRef(initialPage);
  const fetchedKey = useRef<string | null>(null);
  const queryRef = useRef(initialQuery);
  const filtersRef = useRef(initialFilters);
  const debouncedSearchRef = useRef<Debounced<[]> | null>(null);

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
      page: pageRef.current,
    };
  }

  function runSearch() {
    const params = snapshot();

    if (isInvalidRange({ from: params.from, to: params.to })) {
      setDateError(tFilters('badRange'));
      return;
    }

    setDateError(undefined);

    const key = searchKey({ params });
    if (fetchedKey.current === key && pageInfo.page === params.page) {
      return;
    }

    fetchedKey.current = key;
    const id = ++requestId.current;
    setLoading(true);
    setFailed(false);
    router.replace(searchHref({ params }));

    void searchArticles({ locale, params })
      .then((results) => {
        if (id !== requestId.current) {
          return;
        }

        setArticles(results.articles);
        setPageInfo({
          page: results.page,
          pageSize: results.pageSize,
          total: results.total,
        });
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

  const runSearchEvent = useEffectEvent(() => {
    runSearch();
  });

  useEffect(() => {
    const debounced = debounce({
      delay: SEARCH_DEBOUNCE_MS,
      callback: () => {
        runSearchEvent();
      },
    });
    debouncedSearchRef.current = debounced;

    return () => {
      debounced.cancel();
      debouncedSearchRef.current = null;
    };
  }, []);

  function scheduleSearch() {
    pageRef.current = 1;
    debouncedSearchRef.current?.();
  }

  function searchNow() {
    debouncedSearchRef.current?.cancel();
    runSearch();
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only fetch
    runSearch();
    // Later searches come from typing, filters and submit.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only fetch
  }, []);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    pageRef.current = 1;
    searchNow();
  }

  function changeQuery(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.value;
    queryRef.current = next;
    setValue(next);
    scheduleSearch();
  }

  function changeFilters(next: ArticleFilterValues) {
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

    pageRef.current = 1;
    searchNow();
  }

  function clearFilters() {
    filtersRef.current = emptyFilters;
    setFilters(emptyFilters);
    pageRef.current = 1;
    searchNow();
  }

  function pageLabel(pageNumber: number) {
    return tPagination('page', { page: pageNumber });
  }

  function goToPage(pageNumber: number) {
    pageRef.current = pageNumber;
    searchNow();
  }

  const status = loading ? (
    <Loader label={tStatus('loading')} />
  ) : failed ? (
    <p className={styles.error} role="alert">
      {tStatus('error')}
    </p>
  ) : undefined;
  const pageCount = paginationCount({
    total: pageInfo.total,
    pageSize: pageInfo.pageSize,
  });
  const toolbar = (
    <form className={styles.field} onSubmit={submitSearch}>
      <Input
        id="search-query"
        label={t('label')}
        type="search"
        value={value}
        placeholder={t('placeholder')}
        autoComplete="off"
        maxLength={200}
        enterKeyHint="search"
        onChange={changeQuery}
        action={<Button type="submit">{t('submit')}</Button>}
      />
      <ArticleFilters
        categories={categories}
        values={filters}
        dateError={dateError}
        onChange={changeFilters}
        onClear={clearFilters}
      />
    </form>
  );

  return (
    <ArticleListing
      kicker={t('kicker')}
      title={t('title')}
      headingId="search-heading"
      dek={t('dek')}
      empty={t('empty')}
      articles={articles}
      locale={locale}
      toolbar={toolbar}
      status={status}
      pagination={
        <Pagination
          label={tPagination('label')}
          previousLabel={tPagination('previous')}
          nextLabel={tPagination('next')}
          pageLabel={pageLabel}
          page={pageInfo.page}
          pageCount={pageCount}
          onPage={goToPage}
        />
      }
    />
  );
}
