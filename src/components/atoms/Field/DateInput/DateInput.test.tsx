import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { DateInput } from './DateInput';

it('renders a date field with its label', () => {
  renderWithIntl(
    <DateInput label="Published from" value="" onChange={() => undefined} />,
  );

  expect(screen.getByLabelText('Published from')).toHaveAttribute(
    'type',
    'date',
  );
});
