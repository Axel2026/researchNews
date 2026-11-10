import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { AuthScreen } from './AuthScreen';

it('shows the auth title, form, and home brand', () => {
  renderWithIntl(
    <AuthScreen title="Log in">
      <p>Sign in form</p>
    </AuthScreen>,
  );

  expect(screen.getByRole('heading', { name: 'Log in' })).toBeInTheDocument();
  expect(screen.getByText('Sign in form')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'ResearchNews' })).toHaveAttribute(
    'href',
    '/',
  );
});
