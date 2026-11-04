import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import pageStyles from '@/app/[locale]/page.module.css';
import { sampleArticles, sampleCategories } from '@/components/storyData';
import { HomeFeed } from './HomeFeed';

const meta = {
  title: 'Organisms/HomeFeed',
  component: HomeFeed,
  args: {
    articles: sampleArticles,
    categories: sampleCategories,
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
} satisfies Meta<typeof HomeFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
