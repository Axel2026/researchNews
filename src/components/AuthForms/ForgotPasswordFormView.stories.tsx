import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import en from '@/messages/en.json';
import { ForgotPasswordFormView } from './ForgotPasswordFormView';

const meta = {
  title: 'Components/ForgotPasswordFormView',
  component: ForgotPasswordFormView,
} satisfies Meta<typeof ForgotPasswordFormView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    formError: en.Auth.rateLimit,
  },
};

export const Sent: Story = {
  args: {
    status: 'sent',
  },
};
