import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { UserIcon } from './UserIcon';

it('renders a decorative user mark', () => {
  const { container } = renderWithIntl(<UserIcon />);

  expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
});
