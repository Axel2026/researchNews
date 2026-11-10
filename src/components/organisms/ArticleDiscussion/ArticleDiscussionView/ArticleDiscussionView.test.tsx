import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { ArticleDiscussionView } from './ArticleDiscussionView';
import type { ArticleDiscussionCopy } from './ArticleDiscussionView.types';

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

it('shows the empty discussion and a sign-in link', () => {
  renderWithIntl(
    <ArticleDiscussionView
      status="ready"
      authStatus="anonymous"
      comments={[]}
      nextPath="/"
      copy={copy}
      formatDate={(iso) => iso}
    />,
  );

  expect(
    screen.getByRole('heading', { name: 'Discussion' }),
  ).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('No comments yet.');
  expect(
    screen.getByRole('link', { name: 'Log in to join the discussion' }),
  ).toBeInTheDocument();
});
