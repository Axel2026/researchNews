import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { ForgotPasswordForm } from './ForgotPasswordForm';

it('confirms that a reset link was sent', async () => {
  const user = userEvent.setup();
  renderWithIntl(<ForgotPasswordForm />);

  await user.type(
    screen.getByRole('textbox', { name: 'Email' }),
    'ada@example.com',
  );
  await user.click(screen.getByRole('button', { name: 'Send link' }));

  expect(await screen.findByRole('status')).toHaveTextContent(
    'If an account exists, we sent a link to change the password.',
  );
});
