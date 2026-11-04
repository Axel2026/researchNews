import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { sampleArticles, sampleCategories } from '@/components/storyData';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import en from '@/messages/en.json';
import { HomeFeedView } from './HomeFeedView';

const meta = {
  title: 'Organisms/HomeFeed/View',
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
      <PageShell>
        <Story />
      </PageShell>
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
