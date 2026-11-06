import type { ArticleListItem } from '@/data/articles.types';
import type {
  PublicationTimestampParams,
  NewestFirstParams,
  PopularFirstParams,
} from './HomeFeedView.utils.types';

export function publicationTimestamp({
  article,
}: PublicationTimestampParams): number {
  return Date.parse(article.paperPublishedAt ?? article.publishedAt);
}

export function newestFirst({
  articles,
}: NewestFirstParams): ArticleListItem[] {
  return [...articles].sort(
    (left, right) =>
      publicationTimestamp({ article: right }) -
      publicationTimestamp({ article: left }),
  );
}

export function popularFirst({
  articles,
}: PopularFirstParams): ArticleListItem[] {
  return [...articles].sort((left, right) => {
    if (left.recentViews !== right.recentViews) {
      return right.recentViews - left.recentViews;
    }

    return (
      publicationTimestamp({ article: right }) -
      publicationTimestamp({ article: left })
    );
  });
}
