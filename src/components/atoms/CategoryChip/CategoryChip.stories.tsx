import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CategoryChip } from './CategoryChip';

const meta = {
  title: 'Atoms/CategoryChip',
  component: CategoryChip,
  args: {
    field: 'Biochemistry',
  },
} satisfies Meta<typeof CategoryChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongName: Story = {
  args: {
    field: 'Microbial ecology and virology',
  },
};

export const LinkToCategory: Story = {
  args: {
    href: '/category/biochemistry',
  },
};
