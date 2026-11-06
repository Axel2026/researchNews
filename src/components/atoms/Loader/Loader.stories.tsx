import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Loader } from './Loader';

const meta = {
  title: 'Atoms/Loader',
  component: Loader,
  args: {
    label: 'Loading…',
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
