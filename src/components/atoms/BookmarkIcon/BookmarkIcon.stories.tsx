import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BookmarkIcon } from './BookmarkIcon';

const meta = {
  title: 'Atoms/BookmarkIcon',
  component: BookmarkIcon,
} satisfies Meta<typeof BookmarkIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = {};

export const Filled: Story = {
  args: {
    filled: true,
  },
};
