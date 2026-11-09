import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AccountPanelView } from './AccountPanelView';

const copy = {
  provider: 'Provider',
  model: 'Model',
  apiKey: 'API key',
  save: 'Save key',
  remove: 'Remove key',
  saved: 'Key saved.',
  removed: 'Key removed.',
  empty: 'No key for this provider.',
  listHeading: 'Saved keys',
  listEmpty: 'No keys saved yet.',
  editSaved: (name: string) => `Edit the ${name} key`,
  current: (last4: string) => `Saved key ending in ${last4}.`,
  invalid: 'That key does not look usable.',
  error: 'Could not update the key. Try again.',
  loading: 'Loading…',
  providers: {
    openai: 'OpenAI',
    xai: 'xAI',
    anthropic: 'Anthropic',
  },
};

const meta = {
  title: 'Organisms/AccountPanel/View',
  component: AccountPanelView,
  args: {
    keys: [],
    provider: 'openai',
    model: 'gpt-6.1-sol',
    apiKey: '',
    status: 'idle',
    copy,
    onProviderChange: () => undefined,
    onModelChange: () => undefined,
    onApiKeyChange: () => undefined,
    onSave: () => undefined,
    onRemove: () => undefined,
  },
} satisfies Meta<typeof AccountPanelView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Saved: Story = {
  args: {
    keys: [
      {
        provider: 'openai',
        model: 'gpt-6.1-sol',
        last4: 'a1b2',
        updatedAt: '2026-11-06T12:00:00.000Z',
      },
      {
        provider: 'xai',
        model: 'grok-4.7',
        last4: 'c4d8',
        updatedAt: '2026-11-06T12:05:00.000Z',
      },
      {
        provider: 'anthropic',
        model: 'claude-sonnet-5-5',
        last4: '9f3e',
        updatedAt: '2026-11-06T12:10:00.000Z',
      },
    ],
  },
};
