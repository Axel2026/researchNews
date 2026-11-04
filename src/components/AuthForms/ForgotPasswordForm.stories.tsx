import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ForgotPasswordForm } from './ForgotPasswordForm';

const meta = {
  title: 'Components/ForgotPasswordForm',
  component: ForgotPasswordForm,
} satisfies Meta<typeof ForgotPasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
