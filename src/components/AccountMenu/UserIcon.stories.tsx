import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UserIcon } from './UserIcon';

const meta = {
  title: 'Components/UserIcon',
  component: UserIcon,
} satisfies Meta<typeof UserIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
