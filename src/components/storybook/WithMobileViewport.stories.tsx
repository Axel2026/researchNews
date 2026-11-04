import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { WithMobileViewport } from './WithMobileViewport';

const meta = {
  title: 'Storybook/WithMobileViewport',
  component: WithMobileViewport,
} satisfies Meta<typeof WithMobileViewport>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Mobile viewport mock is active.',
  },
};
