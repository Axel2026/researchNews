import styles from '../HomeFeed.module.css';
import { ArticleImage } from '@/components/atoms/ArticleImage/ArticleImage';
import { CategoryChip } from '@/components/atoms/CategoryChip/CategoryChip';
import { ArticleCardGrid } from '@/components/molecules/ArticleCardGrid/ArticleCardGrid';
import { mediaMinLg } from '@/design-system/tokens';
import { Link } from '@/i18n/navigation';
import type {
  HomeFeedSectionProps,
  HomeFeedViewProps,
} from './HomeFeedView.types';
import { newestFirst, popularFirst } from './HomeFeedView.utils';

const HOME_ROW_SIZE = 4;

function HomeFeedSection({
  headingId,
  title,
  description,
  articles,
  locale,
  moreLabel,
  moreHref,
  moreAriaLabel,
}: HomeFeedSectionProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className={styles.latest} aria-labelledby={headingId}>
      <div className={styles.latestHeader}>
        <div className={styles.latestHeaderCopy}>
          <h2 id={headingId}>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {moreHref ? (
          <Link
            className={styles.moreLink}
            href={moreHref}
            aria-label={moreAriaLabel ?? moreLabel}
          >
            {moreLabel} <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
      <ArticleCardGrid articles={articles} locale={locale} layout="row" />
    </section>
  );
}

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
        <article className={styles.featured} aria-labelledby="featured-heading">
          <div className={styles.featuredMedia}>
            <ArticleImage
              src={featured.imageUrl}
              sizes={`${mediaMinLg} 50vw, 100vw`}
              priority
            />
          </div>
          <div className={styles.featuredCopy}>
            <p className={styles.kicker}>{copy.kicker}</p>
            <h2 id="featured-heading" className={styles.featuredTitle}>
              <Link href={`/article/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p className={styles.featuredDek}>{featured.shortPopularization}</p>
            <CategoryChip field={featured.field} />
            <Link
              className={styles.storyLink}
              href={`/article/${featured.slug}`}
              tabIndex={-1}
              aria-hidden="true"
            >
              {copy.readStory} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
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
