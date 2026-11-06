import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PlaybackIcon } from './PlaybackIcon';

const meta = {
  title: 'Molecules/ArticleListen/PlaybackIcon',
  component: PlaybackIcon,
  args: {
    playing: false,
  },
} satisfies Meta<typeof PlaybackIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Play: Story = {};

export const Pause: Story = {
  args: { playing: true },
};
