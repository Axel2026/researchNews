import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Pagination } from './Pagination';

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  args: {
    label: 'Pagination',
    previousLabel: 'Previous',
    nextLabel: 'Next',
    pageLabel: (page: number) => `Page ${page}`,
    page: 3,
    pageCount: 8,
    hrefFor: (page: number) => `/?page=${page}`,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
