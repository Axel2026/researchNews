import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CredentialsFormView } from '@/components/organisms/AuthForms/CredentialsFormView';
import { ForgotPasswordFormView } from '@/components/organisms/AuthForms/ForgotPasswordFormView';
import { ResetPasswordFormView } from '@/components/organisms/AuthForms/ResetPasswordFormView';
import en from '@/messages/en.json';
import { AuthScreen } from './AuthScreen';

const meta = {
  title: 'Templates/AuthScreen',
  component: AuthScreen,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AuthScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: {
    title: en.Auth.loginTitle,
    children: <CredentialsFormView mode="login" />,
  },
};

export const Register: Story = {
  args: {
    title: en.Auth.registerTitle,
    children: <CredentialsFormView mode="register" />,
  },
};

export const ForgotPassword: Story = {
  args: {
    title: en.Auth.forgotTitle,
    children: <ForgotPasswordFormView />,
  },
};

export const ResetPassword: Story = {
  args: {
    title: en.Auth.resetTitle,
    children: <ResetPasswordFormView status="form" />,
  },
};
