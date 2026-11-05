import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BookmarkButtonView } from '@/components/molecules/BookmarkButton/BookmarkButtonView';
import { ArticleDiscussionView } from '@/components/organisms/ArticleDiscussion/ArticleDiscussionView';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import en from '@/messages/en.json';
import { sampleArticleDetail } from '@/components/storyData';
import { NewsArticleView } from './NewsArticleView';

const discussionCopy = {
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
};

const meta = {
  title: 'Organisms/NewsArticle/View',
  component: NewsArticleView,
  args: {
    article: sampleArticleDetail,
    copy: {
      bodyHeading: en.News.bodyHeading,
      source: en.News.source,
      published: (date) => en.News.published.replaceAll('{date}', date),
      viewOriginal: en.News.viewOriginal,
      download: en.News.download,
      opensNewTab: en.News.opensNewTab,
    },
    bookmarkAction: (
      <BookmarkButtonView
        status="unsaved"
        nextPath="/article/sample"
        copy={{
          add: en.Bookmarks.add,
          remove: en.Bookmarks.remove,
          signIn: en.Bookmarks.signIn,
          loading: en.Auth.loading,
        }}
      />
    ),
  },
  decorators: [
    (Story) => (
      <PageShell variant="article">
        <Story />
      </PageShell>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof NewsArticleView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutDownload: Story = {
  args: {
    article: {
      ...sampleArticleDetail,
      downloadUrl: null,
    },
  },
};

export const WithoutSource: Story = {
  args: {
    article: {
      ...sampleArticleDetail,
      sourceUrl: null,
      downloadUrl: null,
    },
  },
};

export const WithDiscussion: Story = {
  args: {
    discussion: (
      <ArticleDiscussionView
        status="ready"
        authStatus="authenticated"
        currentUserId="u1"
        nextPath="/article/sample"
        copy={discussionCopy}
        formatDate={(iso) => iso.slice(0, 10)}
        comments={[
          {
            id: 'c1',
            body: 'Does this method still hold for later samples?',
            createdAt: '2026-03-12T09:15:00.000Z',
            updatedAt: '2026-03-12T09:15:00.000Z',
            deleted: false,
            author: { id: 'u1', displayName: 'anna' },
            replies: [],
          },
        ]}
      />
    ),
  },
};
