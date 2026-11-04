import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AccountMenu } from './AccountMenu';

const meta = {
  title: 'Components/AccountMenu',
  component: AccountMenu,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          position: 'relative',
          minHeight: '16rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AccountMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
