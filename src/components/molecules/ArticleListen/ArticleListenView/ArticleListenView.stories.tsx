import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleListenView } from './ArticleListenView';

const copy = {
  listen: 'Listen',
  pause: 'Pause',
  resume: 'Resume',
  unavailable: 'Read-aloud is unavailable in this browser.',
  noVoice: 'This system has no voice for this language.',
  noVoiceHint:
    'Add the language in Windows Settings under Time & language, then Language & region, and install its text-to-speech voice.',
  noVoiceHintLink: 'Microsoft instructions',
  noVoiceHintLabel: 'How to install a voice',
  opensNewTab: 'opens in a new tab',
};

const meta = {
  title: 'Molecules/ArticleListen/View',
  component: ArticleListenView,
  args: {
    copy,
    onPlay: () => {},
    onPause: () => {},
    onResume: () => {},
  },
} satisfies Meta<typeof ArticleListenView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: { status: 'idle' },
};

export const Playing: Story = {
  args: { status: 'playing' },
};

export const Paused: Story = {
  args: { status: 'paused' },
};

export const Unavailable: Story = {
  args: { status: 'unavailable' },
};

export const NoVoice: Story = {
  args: { status: 'noVoice' },
};
