import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleListen } from '@/components/molecules/ArticleListen/ArticleListen';
import { ArticleSpeechProvider } from './ArticleSpeechProvider';

const meta = {
  title: 'Organisms/NewsArticle/SpeechProvider',
  component: ArticleSpeechProvider,
  args: {
    articleId: 'story',
    segments: [],
    lang: 'en',
    children: <ArticleListen />,
  },
} satisfies Meta<typeof ArticleSpeechProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
