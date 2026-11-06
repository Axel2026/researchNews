import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BookmarkButtonView } from './BookmarkButtonView';

const copy = {
  add: 'Save to bookmarks',
  remove: 'Remove from bookmarks',
  signIn: 'Log in to save this article',
  loading: 'Loading…',
};

const meta = {
  title: 'Molecules/BookmarkButton/View',
  component: BookmarkButtonView,
  args: {
    nextPath: '/article/sample',
    copy,
    onToggle: () => {},
  },
} satisfies Meta<typeof BookmarkButtonView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending: Story = {
  args: {
    status: 'pending',
  },
};

export const SignedOut: Story = {
  args: {
    status: 'anonymous',
  },
};

export const Unsaved: Story = {
  args: {
    status: 'unsaved',
  },
};

export const Saved: Story = {
  args: {
    status: 'saved',
  },
};
