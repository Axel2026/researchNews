import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CredentialsForm } from './CredentialsForm';

const meta = {
  title: 'Components/CredentialsForm',
  component: CredentialsForm,
  args: {
    mode: 'login',
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['login', 'register'],
    },
  },
} satisfies Meta<typeof CredentialsForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {};

export const Register: Story = {
  args: {
    mode: 'register',
  },
};
