import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@/components/atoms/Button/Button';
import { Input } from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  args: {
    label: 'Search query',
    placeholder: 'Search articles',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    action: <Button type="button">Search</Button>,
  },
};

export const Invalid: Story = {
  args: {
    error: 'Enter a valid email address.',
    type: 'email',
    label: 'Email',
    defaultValue: 'not-an-email',
  },
};
