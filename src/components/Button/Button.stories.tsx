import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Artykuły',
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
    children: 'Więcej artykułów',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Artykuły',
  },
};

export const AsLink: Story = {
  args: {
    variant: 'primary',
    href: '/',
    children: 'Więcej artykułów',
  },
};
