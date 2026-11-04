import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ColorGallery } from './ColorGallery';

const meta = {
  title: 'Design System/ColorGallery',
  component: ColorGallery,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ColorGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
