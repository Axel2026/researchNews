import { screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { BookmarkButton } from './BookmarkButton';

vi.mock('@/data/bookmarks', () => ({
  listBookmarks: vi.fn(async () => ({ slugs: [], articles: [] })),
  setBookmark: vi.fn(async () => ({ slugs: [], bookmarked: false })),
}));

it('asks a signed-out reader to log in', async () => {
  renderWithIntl(<BookmarkButton slug="frog-peptides" />);

  expect(
    await screen.findByRole('link', { name: 'Log in to save this article' }),
  ).toHaveAttribute('href', '/login');
});
