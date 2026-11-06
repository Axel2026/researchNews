import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleSpeechProvider } from '../ArticleSpeechProvider/ArticleSpeechProvider';
import { SpokenBlock } from './SpokenBlock';

const meta = {
  title: 'Organisms/NewsArticle/SpokenBlock',
  component: SpokenBlock,
  args: {
    as: 'p',
    segmentId: 'body-1',
    activeClassName: '',
    children: 'The paragraph that can be read aloud.',
  },
  decorators: [
    (Story) => (
      <ArticleSpeechProvider articleId="story" segments={[]} lang="en">
        <Story />
      </ArticleSpeechProvider>
    ),
  ],
} satisfies Meta<typeof SpokenBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
