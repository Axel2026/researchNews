import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { sampleSources } from '@/components/storyData';
import { SourceList } from './SourceList';

const meta = {
  title: 'Organisms/SourceList',
  component: SourceList,
  args: {
    sources: sampleSources,
    locale: 'en',
  },
} satisfies Meta<typeof SourceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
