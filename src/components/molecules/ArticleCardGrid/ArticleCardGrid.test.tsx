import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { sampleArticle, sampleArticles } from '@/components/storyData';
import { renderWithIntl } from '@/test/render';
import { ArticleCardGrid } from './ArticleCardGrid';

it('lists each article as a heading link', () => {
  renderWithIntl(
    <ArticleCardGrid articles={sampleArticles.slice(0, 2)} titleAs="h2" />,
  );

  expect(
    screen.getByRole('heading', {
      level: 2,
      name: sampleArticles[0].title,
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: sampleArticles[1].title }),
  ).toHaveAttribute('href', `/article/${sampleArticles[1].slug}`);
});

it('hides category chips when asked', () => {
  renderWithIntl(
    <ArticleCardGrid articles={[sampleArticle]} showCategoryChip={false} />,
  );

  expect(screen.queryByText('Biochemistry')).not.toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: sampleArticle.title }),
  ).toBeInTheDocument();
});

it('renders an empty list when there are no articles', () => {
  renderWithIntl(<ArticleCardGrid articles={[]} />);

  expect(screen.getByRole('list')).toBeInTheDocument();
  expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
});
