import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Chevron } from '@/components/atoms/Chevron/Chevron';
import styles from '../CategoryDropdown/CategoryDropdown.module.css';
import { Dropdown } from './Dropdown';

const manyItems = Array.from(
  { length: 24 },
  (_, index) => `Option ${index + 1}`,
);

function dropdownItems(itemCount: number) {
  return manyItems.slice(0, itemCount).map((item) => (
    <li key={item}>
      <a className={styles.option} href="#dropdown">
        {item}
      </a>
    </li>
  ));
}

const meta = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  args: {
    align: 'end',
    triggerClassName: styles.trigger,
    label: (
      <>
        Open
        <Chevron className={styles.chevron} strokeWidth={1.5} />
      </>
    ),
    children: dropdownItems(6),
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AlignStart: Story = {
  args: {
    align: 'start',
  },
};

export const Scrollable: Story = {
  args: {
    children: dropdownItems(24),
  },
};
