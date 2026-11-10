import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { sampleArticle } from '@/components/storyData';
import { renderWithIntl } from '@/test/render';
import { Article } from './Article';

it('renders the story as a heading link with its meta', () => {
  renderWithIntl(<Article article={sampleArticle} />);

  expect(
    screen.getByRole('heading', { level: 3, name: sampleArticle.title }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: sampleArticle.title }),
  ).toHaveAttribute('href', `/article/${sampleArticle.slug}`);
  expect(
    screen.getByText(sampleArticle.shortPopularization),
  ).toBeInTheDocument();
  expect(screen.getByText('Mar 12, 2026')).toBeInTheDocument();
  expect(screen.getByText('Biochemistry')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Authors' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  expect(screen.getByRole('link', { name: '4 comments' })).toHaveAttribute(
    'href',
    `/article/${sampleArticle.slug}#discussion-heading`,
  );
});

it('can hide the category and use a section heading', () => {
  renderWithIntl(
    <Article article={sampleArticle} titleAs="h2" showCategoryChip={false} />,
  );

  expect(
    screen.getByRole('heading', { level: 2, name: sampleArticle.title }),
  ).toBeInTheDocument();
  expect(screen.queryByText('Biochemistry')).not.toBeInTheDocument();
});
