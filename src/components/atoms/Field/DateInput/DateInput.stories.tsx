import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DateInput } from './DateInput';

const meta = {
  title: 'Atoms/DateInput',
  component: DateInput,
  args: {
    label: 'Published from',
  },
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Invalid: Story = {
  args: {
    invalid: true,
    describedBy: 'date-error',
  },
  render: (args) => (
    <>
      <DateInput {...args} />
      <p id="date-error">The start date is after the end date.</p>
    </>
  ),
};
