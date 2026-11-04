import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleImage } from './ArticleImage';

const meta = {
  title: 'Components/ArticleImage',
  component: ArticleImage,
  args: {
    src: '/images/news-placeholder.svg',
    alt: 'Article image',
    sizes: '16rem',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: '16rem',
          height: '10rem',
          overflow: 'hidden',
          background: 'var(--color-surface)',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArticleImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Svg: Story = {};

export const Raster: Story = {
  args: {
    src: '/android-chrome-192x192.png',
  },
};

export const Priority: Story = {
  args: {
    src: '/android-chrome-192x192.png',
    priority: true,
  },
};
