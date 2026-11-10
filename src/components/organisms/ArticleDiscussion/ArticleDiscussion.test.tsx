import { screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { ArticleDiscussion } from './ArticleDiscussion';

vi.mock('@/data/comments', async () => {
  const actual =
    await vi.importActual<typeof import('@/data/comments')>('@/data/comments');

  return {
    ...actual,
    listComments: vi.fn(() =>
      Promise.resolve({ comments: [], truncated: false }),
    ),
    createComment: vi.fn(),
    updateComment: vi.fn(),
    deleteComment: vi.fn(),
  };
});

it('shows an empty discussion and a sign-in link', async () => {
  renderWithIntl(<ArticleDiscussion slug="frog-peptides" />);

  expect(
    await screen.findByRole('heading', { name: 'Discussion' }),
  ).toBeInTheDocument();
  expect(await screen.findByText('No comments yet.')).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'Log in to join the discussion' }),
  ).toBeInTheDocument();
});
