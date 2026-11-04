import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AccountMenuView } from './AccountMenu';

const meta = {
  title: 'Components/AccountMenu',
  component: AccountMenuView,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AccountMenuView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending: Story = {
  args: {
    status: 'pending',
    email: null,
  },
};

export const SignedOut: Story = {
  args: {
    status: 'anonymous',
    email: null,
  },
};

export const SignedIn: Story = {
  args: {
    status: 'authenticated',
    email: 'ada@example.com',
    onSignOut: () => {},
  },
};
