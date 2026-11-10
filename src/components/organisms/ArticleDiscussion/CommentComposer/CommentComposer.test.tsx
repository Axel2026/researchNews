import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { CommentComposer } from './CommentComposer';

it('shows the required message when the comment is empty', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  renderWithIntl(
    <CommentComposer
      label="Your comment"
      placeholder="Write a comment"
      submitLabel="Post comment"
      error={null}
      busy={false}
      copy={{
        required: 'Write something before posting.',
        tooLong: 'Comments can be at most 2000 characters.',
      }}
      onSubmit={onSubmit}
    />,
  );

  await user.click(screen.getByRole('button', { name: 'Post comment' }));

  expect(screen.getByRole('alert')).toHaveTextContent(
    'Write something before posting.',
  );
  expect(onSubmit).not.toHaveBeenCalled();
});
