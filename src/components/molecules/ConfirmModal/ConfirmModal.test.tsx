import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { ConfirmModal } from './ConfirmModal';

if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute('open', '');
  };
}

if (!HTMLDialogElement.prototype.close) {
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute('open');
  };
}

it('asks for confirmation and reports the choice', async () => {
  const user = userEvent.setup();
  const onConfirm = vi.fn();
  const onClose = vi.fn();
  renderWithIntl(
    <ConfirmModal
      open
      title="Delete this comment?"
      closeLabel="Close"
      cancelLabel="Cancel"
      confirmLabel="Delete"
      onClose={onClose}
      onConfirm={onConfirm}
    >
      The comment will be removed.
    </ConfirmModal>,
  );

  expect(
    screen.getByRole('heading', { name: 'Delete this comment?' }),
  ).toBeInTheDocument();
  expect(screen.getByText('The comment will be removed.')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Delete' }));
  expect(onConfirm).toHaveBeenCalledOnce();

  await user.click(screen.getByRole('button', { name: 'Cancel' }));
  expect(onClose).toHaveBeenCalledOnce();
});

it('shows an error and disables the actions while busy', () => {
  renderWithIntl(
    <ConfirmModal
      open
      title="Delete this comment?"
      closeLabel="Close"
      cancelLabel="Cancel"
      confirmLabel="Delete"
      busy
      error="That did not work. Try again."
      onClose={() => undefined}
      onConfirm={() => undefined}
    >
      The comment will be removed.
    </ConfirmModal>,
  );

  expect(screen.getByRole('alert')).toHaveTextContent(
    'That did not work. Try again.',
  );
  expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Delete' })).toHaveAttribute(
    'aria-busy',
    'true',
  );
  expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
});
