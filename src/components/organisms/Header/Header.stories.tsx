import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { sampleCategories } from '@/components/storyData';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import { Header } from './Header';

const meta = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [(Story) => <PageShell header={<Story />} />],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    current: 'stories',
    categories: sampleCategories,
  },
};

export const Category: Story = {
  args: {
    current: 'category',
    currentCategorySlug: sampleCategories[0]?.slug,
    categories: sampleCategories,
  },
};

export const Sources: Story = {
  args: {
    current: 'sources',
    categories: sampleCategories,
  },
};

export const Search: Story = {
  args: {
    current: 'search',
    categories: sampleCategories,
  },
};

export const Article: Story = {};

export const Auth: Story = {
  args: {
    showAccountMenu: false,
  },
};

export const Minimal: Story = {
  args: {
    showAccountMenu: false,
    showSearch: false,
    showLanguageSwitcher: false,
  },
};
