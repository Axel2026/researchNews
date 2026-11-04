import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import pageStyles from '@/app/[locale]/article/[slug]/page.module.css';
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
  },
  decorators: [
    (Story) => (
      <div className={pageStyles.page}>
        <div className={pageStyles.main}>
          <Story />
        </div>
      </div>
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
