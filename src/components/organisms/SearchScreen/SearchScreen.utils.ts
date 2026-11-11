import { comparePlainDates } from '@/lib/dates';
import type {
  SearchHrefParams,
  SearchKeyParams,
  IsInvalidRangeParams,
} from './SearchScreen.utils.types';

export function searchHref({ params }: SearchHrefParams) {
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

  if (params.page > 1) {
    query.page = String(params.page);
  }

  if (Object.keys(query).length === 0) {
    return '/search' as const;
  }

  return {
    pathname: '/search' as const,
    query,
  };
}

export function searchKey({ params }: SearchKeyParams) {
  return JSON.stringify(params);
}

export function isInvalidRange({ from, to }: IsInvalidRangeParams) {
  if (!from || !to) {
    return false;
  }

  try {
    return comparePlainDates(from, to) > 0;
  } catch {
    return true;
  }
}
