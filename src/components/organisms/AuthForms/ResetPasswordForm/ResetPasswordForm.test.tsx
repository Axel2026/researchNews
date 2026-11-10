import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { ResetPasswordForm } from './ResetPasswordForm';

it('asks for a new link when there is no session', async () => {
  renderWithIntl(<ResetPasswordForm />);

  expect(await screen.findByRole('alert')).toHaveTextContent(
    'This link expired or is incomplete. Request a new one.',
  );
  expect(
    screen.getByRole('link', { name: 'Request a new link' }),
  ).toBeInTheDocument();
});
