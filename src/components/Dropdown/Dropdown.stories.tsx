import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Dropdown } from './Dropdown';
import styles from '../CategoryDropdown/CategoryDropdown.module.css';

const manyItems = Array.from(
  { length: 24 },
  (_, index) => `Option ${index + 1}`,
);

function DropdownDemo({
  itemCount = 6,
  align = 'end',
}: {
  itemCount?: number;
  align?: 'start' | 'end';
}) {
  return (
    <Dropdown
      align={align}
      triggerClassName={styles.trigger}
      label={
        <>
          Open
          <svg
            className={styles.chevron}
            viewBox="0 0 12 12"
            width="12"
            height="12"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M2.2 4.2 6 8l3.8-3.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </>
      }
    >
      {manyItems.slice(0, itemCount).map((item) => (
        <li key={item}>
          <a className={styles.option} href="#dropdown">
            {item}
          </a>
        </li>
      ))}
    </Dropdown>
  );
}

const meta = {
  title: 'Components/Dropdown',
  component: DropdownDemo,
  decorators: [
    (Story) => (
      <div style={{ minHeight: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Scrollable: Story = {
  args: {
    itemCount: 24,
  },
};
