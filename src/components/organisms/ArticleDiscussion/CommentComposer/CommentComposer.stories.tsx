import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import en from '@/messages/en.json';
import { CommentComposer } from './CommentComposer';

const meta = {
  title: 'Organisms/ArticleDiscussion/Composer',
  component: CommentComposer,
  args: {
    label: en.Discussion.composerLabel,
    placeholder: en.Discussion.placeholder,
    submitLabel: en.Discussion.submit,
    error: null,
    busy: false,
    copy: {
      required: en.Discussion.required,
      tooLong: en.Discussion.tooLong,
    },
    onSubmit: () => {},
  },
} satisfies Meta<typeof CommentComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
