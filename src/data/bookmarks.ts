import { apiUrl } from '@/lib/api';
import type {
  BookmarkList,
  BookmarkUpdate,
  BookmarksUrlParams,
  ListBookmarksParams,
  SetBookmarkParams,
} from './bookmarks.types';

function bookmarksUrl({ locale }: BookmarksUrlParams): URL {
  const url = new URL('/me/bookmarks', apiUrl());
  url.searchParams.set('locale', locale);
  return url;
}

export async function listBookmarks({
  locale,
  accessToken,
}: ListBookmarksParams): Promise<BookmarkList> {
  const response = await fetch(bookmarksUrl({ locale }), {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    throw new Error('unauthorized');
  }

  if (!response.ok) {
    throw new Error(`Failed to load bookmarks: ${response.status}`);
  }

  return response.json() as Promise<BookmarkList>;
}

export async function setBookmark({
  slug,
  bookmarked,
  accessToken,
}: SetBookmarkParams): Promise<BookmarkUpdate> {
  const response = await fetch(new URL('/me/bookmarks', apiUrl()), {
    method: 'PUT',
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ slug, bookmarked }),
  });

  if (response.status === 401) {
    throw new Error('unauthorized');
  }

  if (!response.ok) {
    throw new Error(`Failed to update bookmark: ${response.status}`);
  }

  return response.json() as Promise<BookmarkUpdate>;
}
