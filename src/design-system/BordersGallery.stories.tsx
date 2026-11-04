import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BordersGallery } from './BordersGallery';

const meta = {
  title: 'Design System/BordersGallery',
  component: BordersGallery,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof BordersGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
