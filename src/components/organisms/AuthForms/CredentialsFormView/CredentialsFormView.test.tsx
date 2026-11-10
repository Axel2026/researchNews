import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { CredentialsFormView } from './CredentialsFormView';

function renderLoginForm() {
  return renderWithIntl(<CredentialsFormView mode="login" />);
}

it('shows a validation message when the email is invalid', async () => {
  const user = userEvent.setup();
  renderLoginForm();

  await user.type(
    screen.getByRole('textbox', { name: 'Email' }),
    'not-an-email',
  );
  await user.type(screen.getByLabelText('Password'), 'longenough');
  await user.click(screen.getByRole('button', { name: 'Log in' }));

  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Enter a valid email address.',
  );
});
