import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import en from '@/messages/en.json';
import { CredentialsFormView } from './CredentialsForm';

const meta = {
  title: 'Components/CredentialsForm',
  component: CredentialsFormView,
  args: {
    mode: 'login',
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['login', 'register'],
    },
    status: {
      control: 'radio',
      options: ['form', 'checkEmail', 'redirecting'],
    },
  },
} satisfies Meta<typeof CredentialsFormView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {};

export const Register: Story = {
  args: {
    mode: 'register',
  },
};

export const CallbackError: Story = {
  args: {
    callbackFailed: true,
  },
};

export const FormError: Story = {
  args: {
    formError: en.Auth.invalidCredentials,
  },
};

export const GooglePending: Story = {
  args: {
    googlePending: true,
  },
};

export const CheckEmail: Story = {
  args: {
    mode: 'register',
    status: 'checkEmail',
  },
};

export const Redirecting: Story = {
  args: {
    status: 'redirecting',
  },
};
