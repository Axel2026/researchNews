import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ZIndexGallery } from './ZIndexGallery';

const meta = {
  title: 'Design System/ZIndexGallery',
  component: ZIndexGallery,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ZIndexGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
