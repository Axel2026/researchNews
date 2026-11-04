import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import en from '@/messages/en.json';
import { ErrorScreen } from './ErrorScreen';

const meta = {
  title: 'Templates/ErrorScreen',
  component: ErrorScreen,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ErrorScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotFound: Story = {
  args: {
    code: '404',
    title: en.Error.notFoundTitle,
    homeLabel: en.Error.backHome,
  },
};

export const ServerError: Story = {
  args: {
    code: '500',
    title: en.Error.serverTitle,
    homeLabel: en.Error.backHome,
  },
};
