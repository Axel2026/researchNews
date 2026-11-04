import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { sampleArticles, sampleCategories } from '@/components/storyData';
import { PageShell } from '@/components/templates/PageShell/PageShell';
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
      <PageShell>
        <Story />
      </PageShell>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HomeFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
