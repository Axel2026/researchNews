import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import pageStyles from '@/app/[locale]/article/[slug]/page.module.css';
import { sampleArticleDetail } from '../storyData';
import { NewsArticle } from './NewsArticle';

const meta = {
  title: 'Components/NewsArticle',
  component: NewsArticle,
  args: {
    article: sampleArticleDetail,
    locale: 'en',
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
} satisfies Meta<typeof NewsArticle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
