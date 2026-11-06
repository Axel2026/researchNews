import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleDiscussion } from './ArticleDiscussion';

const meta = {
  title: 'Organisms/ArticleDiscussion',
  component: ArticleDiscussion,
  args: {
    slug: 'sample-article',
  },
} satisfies Meta<typeof ArticleDiscussion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
