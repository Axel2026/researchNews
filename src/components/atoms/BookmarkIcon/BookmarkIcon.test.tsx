import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { BookmarkIcon } from './BookmarkIcon';

it('fills the mark when the bookmark is saved', () => {
  const { container } = renderWithIntl(<BookmarkIcon filled />);

  expect(container.querySelector('path')).toHaveAttribute(
    'fill',
    'currentColor',
  );
});

it('leaves the mark empty when the bookmark is not saved', () => {
  const { container } = renderWithIntl(<BookmarkIcon />);

  expect(container.querySelector('path')).toHaveAttribute('fill', 'none');
});
