import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { ConfirmModal } from './ConfirmModal';

const meta = {
  title: 'Molecules/ConfirmModal',
  component: ConfirmModal,
  args: {
    open: false,
    title: 'Delete comment?',
    closeLabel: 'Close',
    cancelLabel: 'Cancel',
    confirmLabel: 'Delete',
    children: 'This comment will be removed from the discussion.',
    onClose: () => {},
    onConfirm: () => {},
  },
  render: function Render(args) {
    const [open, setOpen] = useState(args.open);

    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          Open confirm dialog
        </button>
        <ConfirmModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: {
    open: true,
  },
};

export const Busy: Story = {
  args: {
    open: true,
    busy: true,
  },
};
