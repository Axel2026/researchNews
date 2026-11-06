import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Chevron } from './Chevron';

const meta = {
  title: 'Atoms/Chevron',
  component: Chevron,
} satisfies Meta<typeof Chevron>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
