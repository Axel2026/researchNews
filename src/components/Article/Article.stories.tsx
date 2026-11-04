import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { sampleArticle } from '../storyData';
import { Article } from './Article';

const meta = {
  title: 'Components/Article',
  component: Article,
  args: {
    article: sampleArticle,
    showCategoryChip: true,
    titleAs: 'h3',
  },
  argTypes: {
    showCategoryChip: { control: 'boolean' },
    titleAs: { control: 'radio', options: ['h2', 'h3'] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '18rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutCategoryChip: Story = {
  args: {
    showCategoryChip: false,
  },
};

export const TitleAsHeading2: Story = {
  args: {
    titleAs: 'h2',
  },
};
