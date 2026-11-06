import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { sampleCategories } from '@/components/storyData';
import { ArticleFilters } from './ArticleFilters';

const emptyFilters = {
  field: '',
  sort: 'newest' as const,
  author: '',
  from: '',
  to: '',
};

const meta = {
  title: 'Molecules/ArticleFilters',
  component: ArticleFilters,
  args: {
    categories: sampleCategories,
    values: emptyFilters,
    onChange: () => {},
    onClear: () => {},
  },
} satisfies Meta<typeof ArticleFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    dateError: 'The start date is after the end date.',
    values: {
      ...emptyFilters,
      from: '2024-01-01',
      to: '2020-01-01',
    },
  },
};
