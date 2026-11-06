import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { InfoHint } from './InfoHint';

const meta = {
  title: 'Molecules/InfoHint',
  component: InfoHint,
  args: {
    children: 'Edit',
    label: 'About editing',
    hint: 'You can edit a comment only within the first hour after posting.',
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof InfoHint>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongHint: Story = {
  args: {
    children: 'Sources',
    label: 'About sources',
    hint: 'These are the publishers and repositories we use to find the papers behind each article.',
  },
};
