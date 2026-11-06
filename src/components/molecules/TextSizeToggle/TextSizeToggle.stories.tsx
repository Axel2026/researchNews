import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TextSizeToggle } from './TextSizeToggle';

const meta = {
  title: 'Molecules/TextSizeToggle',
  component: TextSizeToggle,
} satisfies Meta<typeof TextSizeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
