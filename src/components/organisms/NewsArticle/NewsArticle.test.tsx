import { screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { sampleArticleDetail } from '@/components/storyData';
import { recordArticleView } from '@/data/articles';
import { listComments } from '@/data/comments';
import { renderWithIntl } from '@/test/render';
import { NewsArticle } from './NewsArticle';

vi.mock('@/data/comments', async () => {
  const actual =
    await vi.importActual<typeof import('@/data/comments')>('@/data/comments');
  return {
    ...actual,
    listComments: vi.fn(async () => ({ comments: [], truncated: false })),
  };
});

vi.mock('@/data/articles', async () => {
  const actual =
    await vi.importActual<typeof import('@/data/articles')>('@/data/articles');
  return {
    ...actual,
    recordArticleView: vi.fn(async () => undefined),
  };
});

it('renders the article, a bookmark prompt, and an empty discussion', async () => {
  const view = await NewsArticle({
    article: sampleArticleDetail,
    locale: 'en',
  });
  renderWithIntl(view);

  expect(
    screen.getByRole('heading', { name: sampleArticleDetail.title }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Source paper' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /View original paper/ }),
  ).toHaveAttribute('href', sampleArticleDetail.sourceUrl);
  expect(
    await screen.findByRole('link', {
      name: 'Log in to save this article',
    }),
  ).toBeInTheDocument();
  expect(await screen.findByText('No comments yet.')).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Discussion' }),
  ).toBeInTheDocument();
  await waitFor(() => {
    expect(recordArticleView).toHaveBeenCalledWith({
      slug: sampleArticleDetail.slug,
    });
  });
  expect(listComments).toHaveBeenCalledWith({
    slug: sampleArticleDetail.slug,
  });
});
