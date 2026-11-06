import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleAuthors } from './ArticleAuthors';

const meta = {
  title: 'Molecules/ArticleAuthors',
  component: ArticleAuthors,
  args: {
    authors: ['Ada Lovelace', 'Jane Doe'],
  },
  decorators: [
    (Story) => (
      <div style={{ paddingTop: '8rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ArticleAuthors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ManyAuthors: Story = {
  args: {
    authors: [
      'Ada Lovelace',
      'Grace Hopper',
      'Mary Anning',
      'Katherine Johnson',
      'Rosalind Franklin',
      'Barbara McClintock',
      'Jane Doe',
      'Alan Turing',
    ],
  },
};

export const Empty: Story = {
  args: {
    authors: [],
  },
};
