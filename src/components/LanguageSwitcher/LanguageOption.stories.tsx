import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LanguageOption } from './LanguageOption';

const meta = {
  title: 'Components/LanguageOption',
  component: LanguageOption,
  args: {
    pathname: '/',
    code: 'en',
    current: false,
  },
  decorators: [
    (Story) => (
      <ul
        style={{
          margin: 0,
          padding: '0.5rem 0',
          listStyle: 'none',
          width: '14rem',
          border: 'var(--border-width) solid var(--color-chip-border)',
          background: 'var(--color-surface)',
        }}
      >
        <li>
          <Story />
        </li>
      </ul>
    ),
  ],
} satisfies Meta<typeof LanguageOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Current: Story = {
  args: {
    code: 'pl',
    current: true,
  },
};
