import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RadiiGallery } from './RadiiGallery';

const meta = {
  title: 'Design System/RadiiGallery',
  component: RadiiGallery,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RadiiGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
