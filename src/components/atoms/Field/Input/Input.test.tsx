import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { Input } from './Input';

it('shows an error alert and marks the field invalid', () => {
  renderWithIntl(
    <Input
      label="Email"
      value=""
      onChange={() => undefined}
      error="Enter a valid email address."
    />,
  );

  expect(screen.getByLabelText('Email')).toHaveAttribute(
    'aria-invalid',
    'true',
  );
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Enter a valid email address.',
  );
});
