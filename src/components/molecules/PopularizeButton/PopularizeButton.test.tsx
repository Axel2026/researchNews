import { screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { PopularizeButton } from './PopularizeButton';

vi.mock('@/data/ai-keys', () => ({
  listAiKeys: vi.fn(async () => ({ keys: [] })),
}));

vi.mock('@/data/popularize', () => ({
  popularizeArticle: vi.fn(async () => ({ ok: true })),
}));

vi.mock('@/data/revalidate-articles', () => ({
  revalidateArticles: vi.fn(async () => undefined),
}));

it('asks a signed-out reader to sign in', async () => {
  renderWithIntl(<PopularizeButton slug="frog-peptides" />);

  expect(
    await screen.findByRole('link', { name: 'Sign in to popularize' }),
  ).toHaveAttribute('href', '/login');
});
