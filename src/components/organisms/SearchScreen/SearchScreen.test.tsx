import { screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { sampleCategories } from '@/components/storyData';
import { renderWithIntl } from '@/test/render';
import { SearchScreen } from './SearchScreen';

vi.mock('@/data/articles', () => ({
  searchArticles: vi.fn(() =>
    Promise.resolve({
      articles: [],
      page: 1,
      pageSize: 20,
      total: 0,
    }),
  ),
}));

it('shows an empty search result', async () => {
  renderWithIntl(
    <SearchScreen
      locale="en"
      categories={sampleCategories}
      initialQuery=""
      initialFilters={{
        field: '',
        sort: 'newest',
        author: '',
        from: '',
        to: '',
      }}
      initialPage={1}
    />,
  );

  expect(
    await screen.findByText('No articles match that search.'),
  ).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument();
  expect(
    screen.getByRole('searchbox', { name: 'Search query' }),
  ).toBeInTheDocument();
});
