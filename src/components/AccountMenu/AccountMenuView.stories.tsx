import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { WithMobileViewport } from '@/components/storybook/WithMobileViewport';
import { AccountMenuView } from './AccountMenuView';

const meta = {
  title: 'Components/AccountMenuView',
  component: AccountMenuView,
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
} satisfies Meta<typeof AccountMenuView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending: Story = {
  args: {
    status: 'pending',
  },
};

export const SignedOut: Story = {
  args: {
    status: 'anonymous',
  },
};

export const SignedIn: Story = {
  args: {
    status: 'authenticated',
    onSignOut: () => {},
  },
};

export const SignedInMobile: Story = {
  args: {
    status: 'authenticated',
    onSignOut: () => {},
  },
  decorators: [
    (Story) => (
      <WithMobileViewport>
        <Story />
      </WithMobileViewport>
    ),
  ],
};
