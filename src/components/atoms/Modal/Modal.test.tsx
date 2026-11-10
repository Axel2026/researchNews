import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { Modal } from './Modal';

it('closes when the close button is pressed', async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();
  renderWithIntl(
    <Modal
      open
      title="Delete this comment?"
      closeLabel="Close"
      onClose={onClose}
    >
      <p>The comment will be removed.</p>
    </Modal>,
  );

  expect(
    screen.getByRole('heading', { name: 'Delete this comment?' }),
  ).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Close' }));

  expect(onClose).toHaveBeenCalledOnce();
});
