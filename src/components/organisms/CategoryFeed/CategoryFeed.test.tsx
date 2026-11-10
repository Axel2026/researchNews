import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { sampleArticle, sampleArticles } from '@/components/storyData';
import { renderWithIntl } from '@/test/render';
import { CategoryFeed } from './CategoryFeed';

it('links each story without a category chip', () => {
  renderWithIntl(
    <CategoryFeed articles={sampleArticles.slice(0, 2)} locale="en" />,
  );

  expect(
    screen.getByRole('link', { name: sampleArticle.title }),
  ).toHaveAttribute('href', '/article/frog-peptides');
  expect(
    screen.getByRole('link', { name: sampleArticles[1].title }),
  ).toHaveAttribute('href', '/article/axolotl-viruses');
  expect(
    screen.queryByRole('link', { name: /Go to category/ }),
  ).not.toBeInTheDocument();
});

it('renders an empty list when there are no articles', () => {
  renderWithIntl(<CategoryFeed articles={[]} />);

  expect(screen.getByRole('list')).toBeEmptyDOMElement();
});
