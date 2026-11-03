import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { sampleCategories } from '../storyData';
import { CategoryDropdown } from './CategoryDropdown';

const meta = {
  title: 'Components/CategoryDropdown',
  component: CategoryDropdown,
  args: {
    categories: sampleCategories,
  },
  decorators: [
    (Story) => (
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', minHeight: 280 }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CategoryDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CurrentCategory: Story = {
  args: {
    currentSlug: 'biochemistry',
  },
};

export const Empty: Story = {
  args: {
    categories: [],
  },
};
