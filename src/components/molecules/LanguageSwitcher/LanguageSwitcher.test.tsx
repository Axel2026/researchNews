import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { LanguageSwitcher } from './LanguageSwitcher';

it('opens the language menu and marks English as current', async () => {
  const user = userEvent.setup();
  renderWithIntl(<LanguageSwitcher />);

  expect(
    screen.getByRole('navigation', { name: 'Language' }),
  ).toBeInTheDocument();
  const trigger = screen.getByRole('button', { name: 'Language' });
  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  await user.click(trigger);

  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('list', { hidden: true })).toHaveAttribute(
    'data-popover-open',
  );
  const english = screen.getByRole('link', { name: /English/, hidden: true });
  expect(english).toHaveAttribute('aria-current', 'true');
  expect(english).toHaveTextContent('EN');
  expect(
    screen.getByRole('link', { name: /Polski/, hidden: true }),
  ).toHaveAttribute('hrefLang', 'pl');
});
