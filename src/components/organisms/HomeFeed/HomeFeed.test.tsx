import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { sampleArticle, sampleArticles } from '@/components/storyData';
import { renderWithIntl } from '@/test/render';
import { HomeFeed } from './HomeFeed';

it('renders the featured story and the latest discoveries', async () => {
  const view = await HomeFeed({ articles: sampleArticles, locale: 'en' });
  renderWithIntl(view);

  expect(screen.getByText('Featured article')).toBeInTheDocument();
  expect(screen.getByText('Read the article')).toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: /Read the article/ }),
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Latest discoveries' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: sampleArticle.title }),
  ).toHaveAttribute('href', `/article/${sampleArticle.slug}`);
});

it('renders no featured story when there are no articles', async () => {
  const view = await HomeFeed({ articles: [], locale: 'en' });
  renderWithIntl(view);

  expect(screen.queryByText('Featured article')).not.toBeInTheDocument();
  expect(
    screen.queryByRole('heading', { name: 'Latest discoveries' }),
  ).not.toBeInTheDocument();
});
