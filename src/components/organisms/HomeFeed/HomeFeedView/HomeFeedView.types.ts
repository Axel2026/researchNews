import type { ArticleListItem } from '@/data/articles.types';
import type { AppLocale } from '@/i18n/routing.types';

export type HomeFeedCopy = {
  kicker: string;
  readStory: string;
  popularTitle: string;
  popularDek: string;
  latestTitle: string;
  latestDek: string;
  more: string;
  moreIn: (field: string) => string;
};

export type HomeFeedViewProps = {
  articles: ArticleListItem[];
  locale?: AppLocale;
  copy: HomeFeedCopy;
};
