import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { Select } from './Select';

const options = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most read' },
];

it('reports the chosen option', async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  renderWithIntl(
    <Select
      label="Sort"
      value="newest"
      options={options}
      onChange={onChange}
    />,
  );

  await user.click(screen.getByRole('combobox', { name: 'Sort' }));
  await user.click(
    screen.getByRole('option', { hidden: true, name: 'Most read' }),
  );

  expect(onChange).toHaveBeenCalledWith('popular');
});
