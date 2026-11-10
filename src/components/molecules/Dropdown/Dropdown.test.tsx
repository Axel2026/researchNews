import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { Dropdown } from './Dropdown';

it('opens the menu and shows a child link', async () => {
  const user = userEvent.setup();
  renderWithIntl(
    <Dropdown label="Fields">
      <li>
        <button type="button">Biochemistry</button>
      </li>
    </Dropdown>,
  );

  const trigger = screen.getByRole('button', { name: 'Fields' });
  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  await user.click(trigger);

  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('list', { hidden: true })).toHaveAttribute(
    'data-popover-open',
  );
  expect(
    screen.getByRole('button', { name: 'Biochemistry', hidden: true }),
  ).toBeInTheDocument();
});
