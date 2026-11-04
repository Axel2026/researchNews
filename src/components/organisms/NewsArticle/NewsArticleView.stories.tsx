import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BookmarkButtonView } from '@/components/molecules/BookmarkButton/BookmarkButtonView';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import en from '@/messages/en.json';
import { sampleArticleDetail } from '@/components/storyData';
import { NewsArticleView } from './NewsArticleView';

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
