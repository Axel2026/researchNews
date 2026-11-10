import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { Chevron } from './Chevron';

it('draws a hidden chevron', () => {
  const { container } = renderWithIntl(<Chevron />);
  const icon = container.querySelector('svg');

  expect(icon).toHaveAttribute('aria-hidden', 'true');
  expect(icon?.querySelector('path')).toHaveAttribute('stroke-width', '1.6');
});
