import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { sampleArticle } from '@/components/storyData';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import en from '@/messages/en.json';
import { FeaturedArticle } from './FeaturedArticle';

const meta = {
  title: 'Organisms/HomeFeed/FeaturedArticle',
  component: FeaturedArticle,
  args: {
    article: sampleArticle,
    headingId: 'featured-heading',
    kicker: en.Home.kicker,
    readStory: en.Home.readStory,
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
} satisfies Meta<typeof FeaturedArticle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
