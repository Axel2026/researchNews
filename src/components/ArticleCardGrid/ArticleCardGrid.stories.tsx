import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { sampleArticles } from '../storyData';
import { ArticleCardGrid } from './ArticleCardGrid';

const meta = {
  title: 'Components/ArticleCardGrid',
  component: ArticleCardGrid,
  args: {
    articles: sampleArticles.slice(0, 4),
    layout: 'row',
    showCategoryChip: true,
    titleAs: 'h3',
  },
  argTypes: {
    layout: { control: 'radio', options: ['row', 'wrap'] },
    showCategoryChip: { control: 'boolean' },
    titleAs: { control: 'radio', options: ['h2', 'h3'] },
  },
} satisfies Meta<typeof ArticleCardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {};

export const Wrap: Story = {
  args: {
    articles: sampleArticles,
    layout: 'wrap',
  },
};

export const WithoutCategoryChip: Story = {
  args: {
    showCategoryChip: false,
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
