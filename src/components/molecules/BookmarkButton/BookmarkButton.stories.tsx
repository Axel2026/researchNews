import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BookmarkButton } from './BookmarkButton';

const meta = {
  title: 'Molecules/BookmarkButton',
  component: BookmarkButton,
  args: {
    slug: 'sample-article',
  },
} satisfies Meta<typeof BookmarkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
