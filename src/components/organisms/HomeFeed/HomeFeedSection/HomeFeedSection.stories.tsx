import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { sampleArticles } from '@/components/storyData';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import en from '@/messages/en.json';
import { HomeFeedSection } from './HomeFeedSection';

const meta = {
  title: 'Organisms/HomeFeed/Section',
  component: HomeFeedSection,
  args: {
    headingId: 'popular-heading',
    title: en.Home.popularTitle,
    description: en.Home.popularDek,
    articles: sampleArticles.slice(0, 4),
    locale: 'en',
    moreLabel: en.Home.more,
    moreHref: '/category/biochemistry',
    moreAriaLabel: en.Home.moreIn.replaceAll('{field}', 'Biochemistry'),
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
} satisfies Meta<typeof HomeFeedSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutMoreLink: Story = {
  args: {
    moreHref: undefined,
    moreAriaLabel: undefined,
  },
};

export const WithoutDescription: Story = {
  args: {
    description: undefined,
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
