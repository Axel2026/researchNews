import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { AuthTextField } from './AuthTextField';

it('renders a required email field', () => {
  renderWithIntl(<AuthTextField label="Email" name="email" type="email" />);

  expect(screen.getByRole('textbox', { name: 'Email' })).toBeRequired();
});
