import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { ResetPasswordFormView } from './ResetPasswordFormView';

it('shows the new password fields', () => {
  renderWithIntl(<ResetPasswordFormView status="form" />);

  expect(screen.getByLabelText('Password')).toBeInTheDocument();
  expect(screen.getByLabelText('Repeat password')).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Save password' }),
  ).toBeInTheDocument();
});

it('confirms that the password was changed', () => {
  renderWithIntl(<ResetPasswordFormView status="updated" />);

  expect(screen.getByRole('status')).toHaveTextContent(
    'The password has been changed.',
  );
  expect(
    screen.getByRole('link', { name: 'Back to the home page' }),
  ).toBeInTheDocument();
});
