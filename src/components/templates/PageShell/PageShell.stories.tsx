import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from '@/components/organisms/Header/Header';
import { sampleCategories } from '@/components/storyData';
import { PageShell } from './PageShell';

const meta = {
  title: 'Templates/PageShell',
  component: PageShell,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PageShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Feed: Story = {
  args: {
    header: <Header current="stories" categories={sampleCategories} />,
    children: <p>Feed content</p>,
  },
};

export const Article: Story = {
  args: {
    variant: 'article',
    header: <Header />,
    children: <p>Article content</p>,
  },
};

export const Auth: Story = {
  args: {
    variant: 'auth',
    header: <Header showAccountMenu={false} />,
    children: <p>Auth content</p>,
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    header: <Header showAccountMenu={false} showSearch={false} />,
    children: <p>Error content</p>,
  },
};
