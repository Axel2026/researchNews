import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import pageStyles from '@/app/[locale]/page.module.css';
import en from '@/messages/en.json';
import { sampleArticles, sampleCategories } from '../storyData';
import { HomeFeedView } from './HomeFeed';

const meta = {
  title: 'Components/HomeFeed',
  component: HomeFeedView,
  args: {
    articles: sampleArticles,
    categories: sampleCategories,
    copy: {
      kicker: en.Home.kicker,
      readStory: en.Home.readStory,
      latestTitle: en.Home.latestTitle,
      latestDek: en.Home.latestDek,
      more: en.Home.more,
      moreIn: (field) => en.Home.moreIn.replaceAll('{field}', field),
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
} satisfies Meta<typeof HomeFeedView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FeaturedOnly: Story = {
  args: {
    articles: sampleArticles.slice(0, 1),
    categories: sampleCategories.slice(0, 1),
  },
};

export const Empty: Story = {
  args: {
    articles: [],
    categories: [],
  },
};
