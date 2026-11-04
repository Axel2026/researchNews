import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from '@/components/organisms/Header/Header';
import { sampleArticles, sampleCategories } from '@/components/storyData';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import { ArticleListing } from './ArticleListing';

const biochemistry = sampleArticles.filter(
  (article) => article.field === 'Biochemistry',
);

const meta = {
  title: 'Templates/ArticleListing',
  component: ArticleListing,
  args: {
    kicker: 'Category',
    title: 'Biochemistry',
    headingId: 'listing-heading',
    articles: biochemistry,
  },
  decorators: [
    (Story) => (
      <PageShell
        header={
          <Header
            current="category"
            categories={sampleCategories}
            currentCategorySlug="biochemistry"
          />
        }
      >
        <Story />
      </PageShell>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ArticleListing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Category: Story = {};

export const Bookmarks: Story = {
  args: {
    kicker: 'Account',
    title: 'Bookmarks',
    headingId: 'bookmarks-heading',
    dek: 'Articles you saved for later.',
    empty: 'You have not saved any articles yet.',
    articles: biochemistry,
  },
};

export const Empty: Story = {
  args: {
    kicker: 'Account',
    title: 'Bookmarks',
    headingId: 'bookmarks-heading',
    dek: 'Articles you saved for later.',
    empty: 'You have not saved any articles yet.',
    articles: [],
  },
};
