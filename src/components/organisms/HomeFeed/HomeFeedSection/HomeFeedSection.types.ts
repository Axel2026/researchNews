import type { ArticleListItem } from '@/data/articles.types';
import type { AppLocale } from '@/i18n/routing.types';

export type HomeFeedSectionProps = {
  headingId: string;
  title: string;
  description?: string;
  articles: ArticleListItem[];
  locale: AppLocale;
  moreLabel: string;
  moreHref?: string;
  moreAriaLabel?: string;
};
