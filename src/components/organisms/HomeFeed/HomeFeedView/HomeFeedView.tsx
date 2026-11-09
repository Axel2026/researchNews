import { FeaturedArticle } from '../FeaturedArticle/FeaturedArticle';
import { HomeFeedSection } from '../HomeFeedSection/HomeFeedSection';
import type { HomeFeedViewProps } from './HomeFeedView.types';
import { newestFirst, popularFirst } from './HomeFeedView.utils';

const HOME_ROW_SIZE = 4;

export function HomeFeedView({
  articles,
  locale = 'en',
  copy,
}: HomeFeedViewProps) {
  const [featured, ...rest] = articles;
  const popular = popularFirst({ articles: rest }).slice(0, HOME_ROW_SIZE);
  const latest = newestFirst({ articles: rest }).slice(0, HOME_ROW_SIZE);

  return (
    <>
      {featured ? (
        <FeaturedArticle
          article={featured}
          headingId="featured-heading"
          kicker={copy.kicker}
          readStory={copy.readStory}
        />
      ) : null}

      <HomeFeedSection
        headingId="popular-heading"
        title={copy.popularTitle}
        description={copy.popularDek}
        articles={popular}
        locale={locale}
        moreLabel={copy.more}
      />
      <HomeFeedSection
        headingId="latest-heading"
        title={copy.latestTitle}
        description={copy.latestDek}
        articles={latest}
        locale={locale}
        moreLabel={copy.more}
      />
    </>
  );
}
