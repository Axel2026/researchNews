import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleViewBeacon } from './ArticleViewBeacon';

const meta = {
  title: 'Organisms/NewsArticle/ViewBeacon',
  component: ArticleViewBeacon,
  args: {
    slug: 'sample-article',
  },
} satisfies Meta<typeof ArticleViewBeacon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
