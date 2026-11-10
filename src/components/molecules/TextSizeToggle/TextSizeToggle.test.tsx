import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { TEXT_SIZE_STORAGE_KEY } from '@/lib/text-size';
import { renderWithIntl } from '@/test/render';
import { TextSizeToggle } from './TextSizeToggle';

it('toggles larger text', async () => {
  document.documentElement.removeAttribute('data-text-size');
  localStorage.removeItem(TEXT_SIZE_STORAGE_KEY);
  const user = userEvent.setup();
  renderWithIntl(<TextSizeToggle />);

  const larger = screen.getByRole('button', { name: 'A+, Larger text' });
  expect(larger).toHaveAttribute('aria-pressed', 'false');

  await user.click(larger);

  const smaller = screen.getByRole('button', { name: 'A-, Default text' });
  expect(smaller).toHaveAttribute('aria-pressed', 'true');

  await user.click(smaller);

  expect(
    screen.getByRole('button', { name: 'A+, Larger text' }),
  ).toHaveAttribute('aria-pressed', 'false');
});
