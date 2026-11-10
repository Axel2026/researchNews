import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { PopularizeButtonView } from './PopularizeButtonView';
import type { PopularizeCopy } from './PopularizeButtonView.types';

const copy: PopularizeCopy = {
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

it('shows a loading status while the account is unresolved', () => {
  renderWithIntl(
    <PopularizeButtonView
      status="pending"
      providers={[]}
      provider="openai"
      message={null}
      signInHref="/login"
      accountHref="/account"
      copy={copy}
      onProviderChange={() => undefined}
      onPopularize={() => undefined}
    />,
  );

  expect(screen.getByRole('status')).toHaveTextContent('Loading…');
});

it('links a signed-out reader to login', () => {
  renderWithIntl(
    <PopularizeButtonView
      status="anonymous"
      providers={[]}
      provider="openai"
      message={null}
      signInHref="/login"
      accountHref="/account"
      copy={copy}
      onProviderChange={() => undefined}
      onPopularize={() => undefined}
    />,
  );

  expect(
    screen.getByRole('link', { name: 'Sign in to popularize' }),
  ).toHaveAttribute('href', '/login');
});

it('links a reader who has no key to their account', () => {
  renderWithIntl(
    <PopularizeButtonView
      status="needs-key"
      providers={[]}
      provider="openai"
      message={null}
      signInHref="/login"
      accountHref="/account"
      copy={copy}
      onProviderChange={() => undefined}
      onPopularize={() => undefined}
    />,
  );

  expect(screen.getByRole('link', { name: 'Add an API key' })).toHaveAttribute(
    'href',
    '/account',
  );
});

it('popularizes with the chosen provider and shows a message', async () => {
  const user = userEvent.setup();
  const onPopularize = vi.fn();
  const onProviderChange = vi.fn();
  renderWithIntl(
    <PopularizeButtonView
      status="ready"
      providers={['openai', 'anthropic']}
      provider="openai"
      message="The model did not return a usable article. Try again."
      signInHref="/login"
      accountHref="/account"
      copy={copy}
      onProviderChange={onProviderChange}
      onPopularize={onPopularize}
    />,
  );

  screen.getByRole('combobox', { name: 'Provider' }).focus();
  await user.keyboard('a');
  expect(onProviderChange).toHaveBeenCalledWith('anthropic');

  await user.click(screen.getByRole('button', { name: 'Popularize' }));
  expect(onPopularize).toHaveBeenCalledOnce();
  expect(screen.getByRole('status')).toHaveTextContent(
    'The model did not return a usable article. Try again.',
  );
});

it('disables the action while a popularization is running', () => {
  renderWithIntl(
    <PopularizeButtonView
      status="busy"
      providers={['openai']}
      provider="openai"
      message={null}
      signInHref="/login"
      accountHref="/account"
      copy={copy}
      onProviderChange={() => undefined}
      onPopularize={() => undefined}
    />,
  );

  const action = screen.getByRole('button', { name: 'Writing the article…' });
  expect(action).toBeDisabled();
  expect(action).toHaveAttribute('aria-busy', 'true');
});
