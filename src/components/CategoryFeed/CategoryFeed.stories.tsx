import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { sampleArticles } from '../storyData';
import { CategoryFeed } from './CategoryFeed';

const meta = {
  title: 'Components/CategoryFeed',
  component: CategoryFeed,
  args: {
    articles: sampleArticles.filter(
      (article) => article.field === 'Biochemistry',
    ),
  },
} satisfies Meta<typeof CategoryFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
