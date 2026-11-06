import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PaginationControl } from './PaginationControl';

const meta = {
  title: 'Molecules/Pagination/Control',
  component: PaginationControl,
  args: {
    target: 2,
    className: '',
    children: 2,
    pageLabel: (page: number) => `Page ${page}`,
    hrefFor: (page: number) => `/?page=${page}`,
  },
} satisfies Meta<typeof PaginationControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Link: Story = {};

export const Current: Story = {
  args: { current: true },
};
