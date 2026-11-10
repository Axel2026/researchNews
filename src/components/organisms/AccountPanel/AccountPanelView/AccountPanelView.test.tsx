import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { AccountPanelView } from './AccountPanelView';
import type { AccountPanelCopy } from './AccountPanelView.types';

const copy: AccountPanelCopy = {
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

it('saves a typed key and lists a saved one', async () => {
  const user = userEvent.setup();
  const onSave = vi.fn();
  const onRemove = vi.fn();
  renderWithIntl(
    <AccountPanelView
      keys={[
        {
          provider: 'openai',
          model: 'gpt-6.1-sol',
          last4: 'a1b2',
          updatedAt: '2026-11-06T12:00:00.000Z',
        },
      ]}
      provider="openai"
      model="gpt-6.1-sol"
      apiKey=""
      status="idle"
      copy={copy}
      onProviderChange={vi.fn()}
      onModelChange={vi.fn()}
      onApiKeyChange={vi.fn()}
      onSave={onSave}
      onRemove={onRemove}
    />,
  );

  expect(
    screen.getByRole('heading', { name: 'Saved keys' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Edit the OpenAI key' }),
  ).toBeInTheDocument();
  expect(screen.getAllByText('Saved key ending in a1b2.')).toHaveLength(2);
  await user.click(screen.getByRole('button', { name: 'Save key' }));
  await user.click(screen.getByRole('button', { name: 'Remove key' }));

  expect(onSave).toHaveBeenCalledOnce();
  expect(onRemove).toHaveBeenCalledOnce();
});
