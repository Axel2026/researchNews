import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  args: {
    children: 'Articles',
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
    children: 'More articles',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Articles',
  },
};

export const AsLink: Story = {
  args: {
    variant: 'primary',
    href: '/',
    children: 'More articles',
  },
};

export const SecondaryAsLink: Story = {
  args: {
    variant: 'secondary',
    href: '/',
    children: 'Articles',
  },
};

export const ExternalLink: Story = {
  args: {
    variant: 'primary',
    href: 'https://example.com',
    children: 'View original paper',
  },
};
