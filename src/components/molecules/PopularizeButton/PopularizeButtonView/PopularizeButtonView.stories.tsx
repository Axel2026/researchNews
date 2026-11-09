import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PopularizeButtonView } from './PopularizeButtonView';

const copy = {
  action: 'Popularize',
  pending: 'Writing the article…',
  signIn: 'Sign in to popularize',
  needsKey: 'Add an API key',
  provider: 'Provider',
  loading: 'Loading…',
  providers: {
    openai: 'OpenAI',
    xai: 'xAI',
    anthropic: 'Anthropic',
  },
};

const meta = {
  title: 'Molecules/PopularizeButton/View',
  component: PopularizeButtonView,
  args: {
    status: 'ready',
    providers: ['openai'],
    provider: 'openai',
    message: null,
    signInHref: '/login',
    accountHref: '/account',
    copy,
    onProviderChange: () => undefined,
    onPopularize: () => undefined,
  },
} satisfies Meta<typeof PopularizeButtonView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Ready: Story = {};

export const SeveralProviders: Story = {
  args: {
    providers: ['openai', 'xai'],
  },
};

export const NeedsKey: Story = {
  args: {
    status: 'needs-key',
    providers: [],
  },
};

export const Anonymous: Story = {
  args: {
    status: 'anonymous',
    providers: [],
  },
};
