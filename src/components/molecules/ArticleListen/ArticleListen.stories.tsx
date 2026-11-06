import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleSpeechProvider } from '@/components/organisms/NewsArticle/ArticleSpeechProvider/ArticleSpeechProvider';
import { ArticleListen } from './ArticleListen';

const meta = {
  title: 'Molecules/ArticleListen',
  component: ArticleListen,
  decorators: [
    (Story) => (
      <ArticleSpeechProvider articleId="story" segments={[]} lang="en">
        <Story />
      </ArticleSpeechProvider>
    ),
  ],
} satisfies Meta<typeof ArticleListen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
