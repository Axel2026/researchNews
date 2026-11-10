import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { CredentialsForm } from './CredentialsForm';

it('shows the login and Google buttons', () => {
  renderWithIntl(<CredentialsForm mode="login" />);

  expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Continue with Google' }),
  ).toBeInTheDocument();
});
