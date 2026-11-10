import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { AccountMenuView } from './AccountMenuView';

it('links a signed-out visitor to log in and register', () => {
  renderWithIntl(<AccountMenuView status="anonymous" />);

  expect(screen.getByRole('link', { name: 'Log in' })).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'Create account' }),
  ).toBeInTheDocument();
});

it('offers the account links and signs out', async () => {
  const user = userEvent.setup();
  const onSignOut = vi.fn();
  renderWithIntl(
    <AccountMenuView status="authenticated" onSignOut={onSignOut} />,
  );

  const account = screen.getByRole('button', { name: 'Account' });
  await user.click(account);
  expect(account).toHaveAttribute('aria-expanded', 'true');
  expect(
    screen.getByRole('link', { name: 'User panel', hidden: true }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'Bookmarks', hidden: true }),
  ).toBeInTheDocument();
  await user.click(
    screen.getByRole('button', { name: 'Log out', hidden: true }),
  );

  expect(onSignOut).toHaveBeenCalledOnce();
});
