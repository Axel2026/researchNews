import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { sampleCategories } from '@/components/storyData';
import { Select } from './Select';

const options = [
  { value: '', label: 'All fields' },
  ...sampleCategories.map((category) => ({
    value: category.slug,
    label: category.field,
  })),
];

const meta = {
  title: 'Atoms/Select',
  component: Select,
  args: {
    label: 'Field',
    value: '',
    options,
    onChange: () => {},
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);

    return <Select {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
