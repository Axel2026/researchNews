import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { sampleArticleDetail } from '@/components/storyData';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import { NewsArticle } from './NewsArticle';

const meta = {
  title: 'Organisms/NewsArticle',
  component: NewsArticle,
  args: {
    article: sampleArticleDetail,
    locale: 'en',
  },
  decorators: [
    (Story) => (
      <PageShell variant="article">
        <Story />
      </PageShell>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof NewsArticle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
