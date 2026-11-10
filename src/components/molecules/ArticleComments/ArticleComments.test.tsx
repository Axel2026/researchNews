import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { ArticleComments } from './ArticleComments';

it('links to the discussion with a plural label', () => {
  renderWithIntl(<ArticleComments slug="frog-peptides" count={4} />);

  const link = screen.getByRole('link', { name: '4 comments' });
  expect(link).toHaveAttribute(
    'href',
    '/article/frog-peptides#discussion-heading',
  );
  expect(link).toHaveTextContent('4');
});

it('uses the singular label for one comment', () => {
  renderWithIntl(<ArticleComments slug="frog-peptides" count={1} />);

  expect(screen.getByRole('link', { name: '1 comment' })).toHaveTextContent(
    '1',
  );
});
