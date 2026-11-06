import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { JsonLd } from './JsonLd';

const meta = {
  title: 'Atoms/JsonLd',
  component: JsonLd,
  args: {
    data: {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: 'A sample article',
    },
  },
} satisfies Meta<typeof JsonLd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
