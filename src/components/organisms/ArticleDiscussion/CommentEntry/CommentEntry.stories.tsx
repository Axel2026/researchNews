import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { CommentThread } from '@/data/comments.types';
import en from '@/messages/en.json';
import { CommentEntry } from './CommentEntry';

const createdAt = new Date(Date.now() - 10 * 60 * 1000).toISOString();

const comment: CommentThread = {
  id: 'c1',
  body: 'Does this method still hold for later samples?',
  createdAt,
  updatedAt: createdAt,
  deleted: false,
  author: { id: 'u1', displayName: 'anna' },
  replies: [],
};

const copy = {
  title: en.Discussion.title,
  empty: en.Discussion.empty,
  loading: en.Status.loading,
  error: en.Status.error,
  signIn: en.Discussion.signIn,
  placeholder: en.Discussion.placeholder,
  replyPlaceholder: en.Discussion.replyPlaceholder,
  submit: en.Discussion.submit,
  replySubmit: en.Discussion.replySubmit,
  reply: en.Discussion.reply,
  edit: en.Discussion.edit,
  save: en.Discussion.save,
  cancel: en.Discussion.cancel,
  delete: en.Discussion.delete,
  deleted: en.Discussion.deleted,
  edited: en.Discussion.edited,
  truncated: en.Discussion.truncated,
  required: en.Discussion.required,
  tooLong: en.Discussion.tooLong,
  composerLabel: en.Discussion.composerLabel,
  replyLabel: en.Discussion.replyLabel,
  editLabel: en.Discussion.editLabel,
  editHint: en.Discussion.editHint,
  editHintLabel: en.Discussion.editHintLabel,
};

const meta = {
  title: 'Organisms/ArticleDiscussion/Entry',
  component: CommentEntry,
  args: {
    comment,
    currentUserId: 'u1',
    authStatus: 'authenticated',
    replyToId: null,
    editingId: null,
    busy: false,
    formError: null,
    copy,
    formatDate: (iso: string) => iso,
  },
} satisfies Meta<typeof CommentEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Own: Story = {};
