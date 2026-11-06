import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from '@/components/organisms/Header/Header';
import { sampleCategories, sampleSources } from '@/components/storyData';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import en from '@/messages/en.json';
import { SourceListView } from './SourceListView';

const copy = {
  kicker: en.Sources.kicker,
  title: en.Sources.title,
  dek: en.Sources.dek,
  visit: en.Sources.visit,
  empty: en.Sources.empty,
  opensNewTab: en.News.opensNewTab,
};

const meta = {
  title: 'Organisms/SourceList/View',
  component: SourceListView,
  args: {
    sources: sampleSources,
    copy,
  },
  decorators: [
    (Story) => (
      <PageShell
        header={<Header current="sources" categories={sampleCategories} />}
      >
        <Story />
      </PageShell>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SourceListView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    sources: [],
  },
};
