import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Modal } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  args: {
    open: false,
    onClose: () => {},
    title: 'Language',
    closeLabel: 'Close',
    children: (
      <p>Dialog content stays inside the page until it is needed again.</p>
    ),
  },
  render: function Render(args) {
    const [open, setOpen] = useState(args.open);

    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          Open dialog
        </button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: () => {},
  },
};

export const Open: Story = {
  args: {
    open: true,
  },
};
