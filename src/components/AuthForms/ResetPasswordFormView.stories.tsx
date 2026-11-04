import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import en from '@/messages/en.json';
import { ResetPasswordFormView } from './ResetPasswordFormView';

const meta = {
  title: 'Components/ResetPasswordFormView',
  component: ResetPasswordFormView,
  args: {
    status: 'form',
  },
  argTypes: {
    status: {
      control: 'radio',
      options: ['loading', 'missing', 'form', 'updated'],
    },
  },
} satisfies Meta<typeof ResetPasswordFormView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    status: 'loading',
  },
};

export const MissingSession: Story = {
  args: {
    status: 'missing',
  },
};

export const FormError: Story = {
  args: {
    formError: en.Auth.weakPassword,
  },
};

export const Updated: Story = {
  args: {
    status: 'updated',
  },
};
