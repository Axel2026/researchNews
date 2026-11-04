import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TypographyGallery } from './TypographyGallery';

const meta = {
  title: 'Design System/TypographyGallery',
  component: TypographyGallery,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof TypographyGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
