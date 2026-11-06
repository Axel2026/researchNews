import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AuthTextField } from './AuthTextField';

const meta = {
  title: 'Organisms/AuthForms/TextField',
  component: AuthTextField,
  args: {
    label: 'Email',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
  },
} satisfies Meta<typeof AuthTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
