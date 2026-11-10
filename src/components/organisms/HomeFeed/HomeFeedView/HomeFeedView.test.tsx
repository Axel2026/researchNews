import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { sampleArticle, sampleArticles } from '@/components/storyData';
import { renderWithIntl } from '@/test/render';
import { HomeFeedView } from './HomeFeedView';
import type { HomeFeedCopy } from './HomeFeedView.types';

const copy: HomeFeedCopy = {
  kicker: 'Featured article',
  readStory: 'Read the article',
  popularTitle: 'Most-read articles',
  popularDek: 'What readers opened in the last 30 days.',
  latestTitle: 'Latest discoveries',
  latestDek: 'New research, fresh insights and growing questions.',
  more: 'More',
  moreIn: (field: string) => `More in ${field}`,
};

it('features the first article and lists the latest discoveries', () => {
  renderWithIntl(
    <HomeFeedView articles={sampleArticles} locale="en" copy={copy} />,
  );

  expect(screen.getByText('Featured article')).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: sampleArticle.title }),
  ).toHaveAttribute('href', '/article/frog-peptides');
  const readStory = screen
    .getAllByRole('link', { hidden: true })
    .find((link) => link.textContent?.includes('Read the article'));
  expect(readStory).toHaveAttribute('href', '/article/frog-peptides');
  expect(
    screen.getByRole('heading', { name: 'Most-read articles' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Latest discoveries' }),
  ).toBeInTheDocument();
  expect(
    screen.getAllByRole('link', { name: sampleArticles[1].title }),
  ).toHaveLength(2);
});

it('renders no sections when there are no articles', () => {
  renderWithIntl(<HomeFeedView articles={[]} copy={copy} />);

  expect(screen.queryByText('Featured article')).not.toBeInTheDocument();
  expect(
    screen.queryByRole('heading', { name: 'Latest discoveries' }),
  ).not.toBeInTheDocument();
});
