import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { WithMobileViewport } from '@/components/storybook/WithMobileViewport';
import { LanguageSwitcher } from './LanguageSwitcher';

const meta = {
  title: 'Molecules/LanguageSwitcher',
  component: LanguageSwitcher,
  decorators: [
    (Story) => (
      <div style={{ minHeight: '16rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  decorators: [
    (Story) => (
      <WithMobileViewport>
        <Story />
      </WithMobileViewport>
    ),
  ],
};
