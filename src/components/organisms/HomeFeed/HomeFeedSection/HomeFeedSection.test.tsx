import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { sampleArticles } from '@/components/storyData';
import { renderWithIntl } from '@/test/render';
import { HomeFeedSection } from './HomeFeedSection';

it('renders nothing when the section has no articles', () => {
  renderWithIntl(
    <HomeFeedSection
      headingId="latest-heading"
      title="Latest discoveries"
      description="New research, fresh insights and growing questions."
      articles={[]}
      locale="en"
      moreLabel="More"
      moreHref="/latest"
    />,
  );

  expect(
    screen.queryByRole('heading', { name: 'Latest discoveries' }),
  ).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'More' })).not.toBeInTheDocument();
});

it('shows the heading, stories, and a more link', () => {
  renderWithIntl(
    <HomeFeedSection
      headingId="latest-heading"
      title="Latest discoveries"
      description="New research, fresh insights and growing questions."
      articles={sampleArticles.slice(1, 3)}
      locale="en"
      moreLabel="More"
      moreHref="/latest"
      moreAriaLabel="More latest discoveries"
    />,
  );

  expect(
    screen.getByRole('heading', { name: 'Latest discoveries' }),
  ).toBeInTheDocument();
  expect(
    screen.getByText('New research, fresh insights and growing questions.'),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: sampleArticles[1].title }),
  ).toHaveAttribute('href', '/article/axolotl-viruses');
  expect(
    screen.getByRole('link', { name: 'More latest discoveries' }),
  ).toHaveAttribute('href', '/latest');
});
