import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DesignSystemOverview } from './DesignSystemOverview';

const meta = {
  title: 'Design System/Overview',
  component: DesignSystemOverview,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof DesignSystemOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
