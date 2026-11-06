import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { sampleArticles } from '@/components/storyData';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import en from '@/messages/en.json';
import { HomeFeedView } from './HomeFeedView';

const meta = {
  title: 'Organisms/HomeFeed/View',
  component: HomeFeedView,
  args: {
    articles: sampleArticles,
    copy: {
      kicker: en.Home.kicker,
      readStory: en.Home.readStory,
      popularTitle: en.Home.popularTitle,
      popularDek: en.Home.popularDek,
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

export const WithPopularHits: Story = {
  args: {
    articles: sampleArticles.map((article) =>
      article.slug === 'barn-light'
        ? { ...article, recentViews: 18 }
        : article.slug === 'delta-salinity'
          ? { ...article, recentViews: 7 }
          : article,
    ),
  },
};

export const FeaturedOnly: Story = {
  args: {
    articles: sampleArticles.slice(0, 1),
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
