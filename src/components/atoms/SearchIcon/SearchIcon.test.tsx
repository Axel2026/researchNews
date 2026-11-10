import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { SearchIcon } from './SearchIcon';

it('renders a decorative search mark', () => {
  const { container } = renderWithIntl(<SearchIcon />);

  expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
});
