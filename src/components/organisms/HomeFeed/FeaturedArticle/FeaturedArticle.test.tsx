import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { sampleArticle } from '@/components/storyData';
import { renderWithIntl } from '@/test/render';
import { FeaturedArticle } from './FeaturedArticle';

it('shows the kicker, title, and a link to the article', () => {
  renderWithIntl(
    <FeaturedArticle
      article={sampleArticle}
      headingId="featured-heading"
      kicker="Featured article"
      readStory="Read the article"
    />,
  );

  expect(screen.getByText('Featured article')).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: sampleArticle.title }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: sampleArticle.title }),
  ).toHaveAttribute('href', '/article/frog-peptides');
  expect(screen.getByText('Read the article')).toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: /Read the article/ }),
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole('img', { name: sampleArticle.title }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(sampleArticle.shortPopularization),
  ).toBeInTheDocument();
  expect(screen.getByText('Biochemistry')).toBeInTheDocument();
});
