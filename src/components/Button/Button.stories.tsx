import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Opracowania',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Więcej opracowań',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Opracowania',
  },
};

export const AsLink: Story = {
  args: {
    variant: 'primary',
    href: '/',
    children: 'Więcej opracowań',
  },
};
