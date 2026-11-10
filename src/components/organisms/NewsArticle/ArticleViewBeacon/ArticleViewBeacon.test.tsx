import { waitFor } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';
import { recordArticleView } from '@/data/articles';
import { renderWithIntl } from '@/test/render';
import { ArticleViewBeacon } from './ArticleViewBeacon';

vi.mock('@/data/articles', async () => {
  const actual =
    await vi.importActual<typeof import('@/data/articles')>('@/data/articles');
  return {
    ...actual,
    recordArticleView: vi.fn(async () => undefined),
  };
});

beforeEach(() => {
  vi.mocked(recordArticleView).mockClear();
  localStorage.clear();
});

it('records a view once for a slug', async () => {
  const slug = 'beacon-record-once';
  const key = `view:${slug}:${new Date().toISOString().slice(0, 10)}`;
  const { unmount } = renderWithIntl(<ArticleViewBeacon slug={slug} />);

  await waitFor(() => {
    expect(recordArticleView).toHaveBeenCalledTimes(1);
  });
  expect(recordArticleView).toHaveBeenCalledWith({ slug });
  expect(localStorage.getItem(key)).toBe('1');

  unmount();
  renderWithIntl(<ArticleViewBeacon slug={slug} />);

  expect(recordArticleView).toHaveBeenCalledTimes(1);
});

it('skips recording when the view was already stored', () => {
  const slug = 'beacon-already-stored';
  const key = `view:${slug}:${new Date().toISOString().slice(0, 10)}`;
  localStorage.setItem(key, '1');

  renderWithIntl(<ArticleViewBeacon slug={slug} />);

  expect(recordArticleView).not.toHaveBeenCalled();
});
