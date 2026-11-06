import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { CommentThread } from '@/data/comments';
import en from '@/messages/en.json';
import { ArticleDiscussionView } from './ArticleDiscussionView';

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

const recentCreatedAt = new Date(Date.now() - 10 * 60 * 1000).toISOString();

const comments: CommentThread[] = [
  {
    id: 'c1',
    body: 'Does this method still hold for later samples?',
    createdAt: recentCreatedAt,
    updatedAt: recentCreatedAt,
    deleted: false,
    author: { id: 'u1', displayName: 'anna' },
    replies: [
      {
        id: 'c2',
        body: 'The paper repeats the assay on a second cohort.',
        createdAt: '2026-03-12T10:02:00.000Z',
        updatedAt: '2026-03-12T10:40:00.000Z',
        deleted: false,
        author: { id: 'u2', displayName: 'piotr' },
      },
    ],
  },
  {
    id: 'c3',
    body: '',
    createdAt: '2026-03-11T18:00:00.000Z',
    updatedAt: '2026-03-11T18:00:00.000Z',
    deleted: true,
    author: { id: 'u3', displayName: 'lea' },
    replies: [
      {
        id: 'c4',
        body: 'Still worth reading the methods section.',
        createdAt: '2026-03-11T19:20:00.000Z',
        updatedAt: '2026-03-11T19:20:00.000Z',
        deleted: false,
        author: { id: 'u1', displayName: 'anna' },
      },
    ],
  },
];

const meta = {
  title: 'Organisms/ArticleDiscussion/View',
  component: ArticleDiscussionView,
  args: {
    status: 'ready',
    authStatus: 'authenticated',
    comments,
    currentUserId: 'u1',
    nextPath: '/article/sample',
    copy,
    formatDate: (iso: string) => iso.slice(0, 10),
    onSubmit: () => {},
    onReply: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ArticleDiscussionView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignedIn: Story = {};

export const SignedOut: Story = {
  args: {
    authStatus: 'anonymous',
    currentUserId: null,
  },
};

export const Empty: Story = {
  args: {
    comments: [],
  },
};

export const Loading: Story = {
  args: {
    status: 'pending',
    comments: [],
  },
};

export const ErrorState: Story = {
  args: {
    status: 'error',
    comments: [],
  },
};

export const Replying: Story = {
  args: {
    replyToId: 'c1',
  },
};

export const Editing: Story = {
  args: {
    editingId: 'c1',
  },
};
