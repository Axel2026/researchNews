import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { AccountMenu } from './AccountMenu';

it('shows log in and create account when signed out', async () => {
  renderWithIntl(<AccountMenu />);

  expect(
    await screen.findByRole('link', { name: 'Log in' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'Create account' }),
  ).toBeInTheDocument();
});
