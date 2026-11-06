import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from '@/components/organisms/Header/Header';
import { sampleCategories } from '@/components/storyData';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import { SearchScreen } from './SearchScreen';

const meta = {
  title: 'Organisms/SearchScreen',
  component: SearchScreen,
  args: {
    locale: 'en',
    initialQuery: '',
  },
  decorators: [
    (Story) => (
      <PageShell
        header={<Header current="search" categories={sampleCategories} />}
      >
        <Story />
      </PageShell>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SearchScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
