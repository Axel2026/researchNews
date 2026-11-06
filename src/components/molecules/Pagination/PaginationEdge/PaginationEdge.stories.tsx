import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PaginationEdge } from './PaginationEdge';

const meta = {
  title: 'Molecules/Pagination/Edge',
  component: PaginationEdge,
  args: {
    target: 2,
    text: 'Next',
    pageCount: 8,
    pageLabel: (page: number) => `Page ${page}`,
    hrefFor: (page: number) => `/?page=${page}`,
  },
} satisfies Meta<typeof PaginationEdge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Enabled: Story = {};

export const Disabled: Story = {
  args: { target: 0, text: 'Previous' },
};
