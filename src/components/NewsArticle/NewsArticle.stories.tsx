import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import newsStyles from '@/app/[locale]/news/[slug]/page.module.css';
import en from '@/messages/en.json';
import { sampleArticleDetail } from '../storyData';
import { NewsArticleView } from './NewsArticle';

const meta = {
  title: 'Components/NewsArticle',
  component: NewsArticleView,
  args: {
    article: sampleArticleDetail,
    copy: {
      kicker: en.News.kicker,
      bodyHeading: en.News.bodyHeading,
      source: en.News.source,
      moreStories: en.News.moreStories,
    },
  },
  decorators: [
    (Story) => (
      <div className={newsStyles.page}>
        <div className={newsStyles.main}>
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
