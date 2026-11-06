import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleComments } from './ArticleComments';

const meta = {
  title: 'Molecules/ArticleComments',
  component: ArticleComments,
  args: {
    slug: 'sample-article',
    count: 3,
  },
} satisfies Meta<typeof ArticleComments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const None: Story = {
  args: { count: 0 },
};
