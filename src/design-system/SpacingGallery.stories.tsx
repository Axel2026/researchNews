import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SpacingGallery } from './SpacingGallery';

const meta = {
  title: 'Design System/SpacingGallery',
  component: SpacingGallery,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof SpacingGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
