import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { BookmarkButtonView } from './BookmarkButtonView';

const copy = {
  add: 'Save to bookmarks',
  remove: 'Remove from bookmarks',
  signIn: 'Log in to save this article',
  loading: 'Loading…',
};

it('shows a loading status while the bookmark state is pending', () => {
  renderWithIntl(
    <BookmarkButtonView status="pending" nextPath="/" copy={copy} />,
  );

  expect(screen.getByRole('status')).toHaveTextContent('Loading…');
});

it('links a signed-out reader to login', () => {
  renderWithIntl(
    <BookmarkButtonView status="anonymous" nextPath="/" copy={copy} />,
  );

  expect(
    screen.getByRole('link', { name: 'Log in to save this article' }),
  ).toHaveAttribute('href', '/login');
});

it('saves and removes a bookmark', async () => {
  const user = userEvent.setup();
  const onToggle = vi.fn();
  const { rerender } = renderWithIntl(
    <BookmarkButtonView
      status="unsaved"
      nextPath="/"
      copy={copy}
      onToggle={onToggle}
    />,
  );

  await user.click(screen.getByRole('button', { name: 'Save to bookmarks' }));
  expect(onToggle).toHaveBeenCalledOnce();

  rerender(
    <BookmarkButtonView
      status="saved"
      nextPath="/"
      copy={copy}
      onToggle={onToggle}
    />,
  );
  const remove = screen.getByRole('button', { name: 'Remove from bookmarks' });
  expect(remove).toHaveAttribute('aria-pressed', 'true');
  await user.click(remove);
  expect(onToggle).toHaveBeenCalledTimes(2);
});

it('disables the control while a save is in progress', () => {
  renderWithIntl(
    <BookmarkButtonView status="saved" nextPath="/" busy copy={copy} />,
  );

  const remove = screen.getByRole('button', { name: 'Remove from bookmarks' });
  expect(remove).toBeDisabled();
  expect(remove).toHaveAttribute('aria-busy', 'true');
});
