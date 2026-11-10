import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { ForgotPasswordFormView } from './ForgotPasswordFormView';

it('shows the email form and a way back to log in', () => {
  renderWithIntl(<ForgotPasswordFormView />);

  expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Send link' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Log in' })).toBeInTheDocument();
});

it('shows the sent notice', () => {
  renderWithIntl(<ForgotPasswordFormView status="sent" />);

  expect(screen.getByRole('status')).toHaveTextContent(
    'If an account exists, we sent a link to change the password.',
  );
});
