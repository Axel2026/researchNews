import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { sampleArticle } from '@/components/storyData';
import { renderWithIntl } from '@/test/render';
import { ArticleListing } from './ArticleListing';

it('lists articles with the page heading, toolbar, and pagination', () => {
  renderWithIntl(
    <ArticleListing
      kicker="Category"
      title="Biochemistry"
      headingId="category-heading"
      dek="Popular-science articles in Biochemistry."
      articles={[sampleArticle]}
      toolbar={<button type="button">Newest</button>}
      pagination={<button type="button">Next</button>}
    />,
  );

  expect(screen.getByText('Category')).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Biochemistry' }),
  ).toBeInTheDocument();
  expect(
    screen.getByText('Popular-science articles in Biochemistry.'),
  ).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Newest' })).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: sampleArticle.title }),
  ).toHaveAttribute('href', '/article/frog-peptides');
  expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
});

it('shows the empty message when there are no articles', () => {
  renderWithIntl(
    <ArticleListing
      kicker="Find"
      title="Search"
      headingId="search-heading"
      empty="No articles match that search."
      articles={[]}
    />,
  );

  expect(screen.getByRole('status')).toHaveTextContent(
    'No articles match that search.',
  );
  expect(
    screen.queryByRole('link', { name: sampleArticle.title }),
  ).not.toBeInTheDocument();
});

it('shows a status in place of the feed and pagination', () => {
  renderWithIntl(
    <ArticleListing
      kicker="Category"
      title="Biochemistry"
      headingId="category-heading"
      articles={[sampleArticle]}
      status={<p role="status">Loading…</p>}
      pagination={<button type="button">Next</button>}
    />,
  );

  expect(screen.getByRole('status')).toHaveTextContent('Loading…');
  expect(
    screen.queryByRole('link', { name: sampleArticle.title }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Next' }),
  ).not.toBeInTheDocument();
});
