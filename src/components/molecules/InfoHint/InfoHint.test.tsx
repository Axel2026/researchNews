import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { InfoHint } from './InfoHint';

const description =
  'You can edit a comment only within the first hour after posting.';

it('shows the hint when the info button is opened', async () => {
  const user = userEvent.setup();
  renderWithIntl(
    <InfoHint
      label="About editing"
      description={description}
      hint={<span>Edit window details</span>}
    >
      edited
    </InfoHint>,
  );

  expect(screen.getByText('edited')).toBeInTheDocument();
  const trigger = screen.getByRole('button', { name: 'About editing' });
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByText('Edit window details')).not.toBeInTheDocument();
  expect(screen.getByRole('tooltip')).toHaveTextContent(description);

  await user.click(trigger);

  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText('Edit window details')).toBeVisible();

  await user.keyboard('{Escape}');

  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByText('Edit window details')).not.toBeInTheDocument();
});
