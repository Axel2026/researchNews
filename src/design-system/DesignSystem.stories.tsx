import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  BordersGallery,
  ColorGallery,
  DesignSystemOverview,
  RadiiGallery,
  SpacingGallery,
  TypographyGallery,
} from './TokenGallery';

const meta = {
  title: 'Design System',
  component: DesignSystemOverview,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof DesignSystemOverview>;

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <DesignSystemOverview />,
};

export const Colors: Story = {
  render: () => <ColorGallery />,
};

export const Spacing: Story = {
  render: () => <SpacingGallery />,
};

export const Radii: Story = {
  render: () => <RadiiGallery />,
};

export const Typography: Story = {
  render: () => <TypographyGallery />,
};

export const Borders: Story = {
  render: () => <BordersGallery />,
};
