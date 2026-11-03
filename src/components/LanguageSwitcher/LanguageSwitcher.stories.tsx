import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LanguageSwitcher } from './LanguageSwitcher';

const meta = {
  title: 'Components/LanguageSwitcher',
  component: LanguageSwitcher,
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: '16rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
