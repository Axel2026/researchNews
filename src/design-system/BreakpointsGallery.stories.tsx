import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BreakpointsGallery } from './BreakpointsGallery';

const meta = {
  title: 'Design System/BreakpointsGallery',
  component: BreakpointsGallery,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof BreakpointsGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
