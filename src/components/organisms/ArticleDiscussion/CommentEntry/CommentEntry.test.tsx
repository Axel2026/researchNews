import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { CommentEntry } from './CommentEntry';
import type { ArticleDiscussionCopy } from '../ArticleDiscussionView/ArticleDiscussionView.types';

const copy: ArticleDiscussionCopy = {
  title: 'Discussion',
  empty: 'No comments yet.',
  loading: 'Loading…',
  error: 'Could not load this content.',
  signIn: 'Log in to join the discussion',
  placeholder: 'Write a comment',
  replyPlaceholder: 'Write a reply',
  submit: 'Post comment',
  replySubmit: 'Post reply',
  reply: 'Reply',
  edit: 'Edit',
  save: 'Save',
  cancel: 'Cancel',
  delete: 'Delete',
  deleted: 'This comment was removed.',
  edited: 'edited',
  truncated: 'Showing the latest 100 comments.',
  required: 'Write something before posting.',
  tooLong: 'Comments can be at most 2000 characters.',
  composerLabel: 'Your comment',
  replyLabel: 'Your reply',
  editLabel: 'Edit comment',
  editHint: 'You can edit a comment only within the first hour after posting.',
  editHintLabel: 'About editing',
};

const createdAt = new Date().toISOString();

it('shows the comment and asks to delete it', async () => {
  const user = userEvent.setup();
  const onDelete = vi.fn();
  renderWithIntl(
    <CommentEntry
      comment={{
        id: 'c1',
        body: 'Does this method still hold for later samples?',
        createdAt,
        updatedAt: createdAt,
        deleted: false,
        author: { id: 'u1', displayName: 'anna' },
        replies: [],
      }}
      currentUserId="u1"
      authStatus="authenticated"
      replyToId={null}
      editingId={null}
      busy={false}
      formError={null}
      copy={copy}
      formatDate={() => '12 Mar 2026'}
      onSubmit={vi.fn()}
      onReply={vi.fn()}
      onEdit={vi.fn()}
      onDelete={onDelete}
    />,
  );

  expect(screen.getByText('anna')).toBeInTheDocument();
  expect(screen.getByText('12 Mar 2026')).toBeInTheDocument();
  expect(
    screen.getByText('Does this method still hold for later samples?'),
  ).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Delete' }));

  expect(onDelete).toHaveBeenCalledWith('c1');
});
