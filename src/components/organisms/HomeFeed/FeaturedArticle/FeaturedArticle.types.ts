import type { ArticleListItem } from '@/data/articles.types';

export type FeaturedArticleProps = {
  article: ArticleListItem;
  headingId: string;
  kicker: string;
  readStory: string;
};
