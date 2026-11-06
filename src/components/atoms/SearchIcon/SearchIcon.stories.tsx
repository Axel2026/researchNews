import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SearchIcon } from './SearchIcon';

const meta = {
  title: 'Atoms/SearchIcon',
  component: SearchIcon,
} satisfies Meta<typeof SearchIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
