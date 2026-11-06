import styles from './HomeFeed.module.css';
import { ArticleImage } from '@/components/atoms/ArticleImage/ArticleImage';
import { CategoryChip } from '@/components/atoms/CategoryChip/CategoryChip';
import { ArticleCardGrid } from '@/components/molecules/ArticleCardGrid/ArticleCardGrid';
import type { ArticleCategory, ArticleListItem } from '@/data/articles';
import { mediaMinLg } from '@/design-system/tokens';
import { Link } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';

const HOME_ROW_SIZE = 4;

function publicationTimestamp(article: ArticleListItem): number {
  return Date.parse(article.paperPublishedAt ?? article.publishedAt);
}

function newestFirst(articles: ArticleListItem[]): ArticleListItem[] {
  return [...articles].sort(
    (left, right) => publicationTimestamp(right) - publicationTimestamp(left),
  );
}

function popularFirst(articles: ArticleListItem[]): ArticleListItem[] {
  return [...articles].sort((left, right) => {
    if (left.recentViews !== right.recentViews) {
      return right.recentViews - left.recentViews;
    }

    return publicationTimestamp(right) - publicationTimestamp(left);
  });
}

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

export function HomeFeedView({
  articles,
  categories,
  locale = 'en',
  copy,
}: {
  articles: ArticleListItem[];
  categories: ArticleCategory[];
  locale?: AppLocale;
  copy: HomeFeedCopy;
}) {
  const [featured, ...rest] = articles;
  const popular = popularFirst(rest).slice(0, HOME_ROW_SIZE);
  const latest = newestFirst(rest).slice(0, HOME_ROW_SIZE);

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

      {popular.length > 0 ? (
        <section className={styles.latest} aria-labelledby="popular-heading">
          <div className={styles.latestHeader}>
            <div className={styles.latestHeaderCopy}>
              <h2 id="popular-heading">{copy.popularTitle}</h2>
              <p>{copy.popularDek}</p>
            </div>
          </div>
          <ArticleCardGrid articles={popular} locale={locale} layout="row" />
        </section>
      ) : null}

      {latest.length > 0 ? (
        <section className={styles.latest} aria-labelledby="latest-heading">
          <div className={styles.latestHeader}>
            <div className={styles.latestHeaderCopy}>
              <h2 id="latest-heading">{copy.latestTitle}</h2>
              <p>{copy.latestDek}</p>
            </div>
          </div>
          <ArticleCardGrid articles={latest} locale={locale} layout="row" />
        </section>
      ) : null}

      {categories.map((category) => {
        const row = newestFirst(
          articles.filter(
            (article) =>
              article.fieldSlug === category.slug ||
              article.field === category.field,
          ),
        ).slice(0, HOME_ROW_SIZE);

        if (row.length === 0) {
          return null;
        }

        const headingId = `category-${category.slug}-heading`;
        const moreIn = copy.moreIn(category.field);

        return (
          <section
            key={category.slug}
            className={styles.latest}
            aria-labelledby={headingId}
          >
            <div className={styles.latestHeader}>
              <div className={styles.latestHeaderCopy}>
                <h2 id={headingId}>{category.field}</h2>
              </div>
              <Link
                className={styles.moreLink}
                href={`/category/${category.slug}`}
                aria-label={moreIn}
              >
                {copy.more} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <ArticleCardGrid
              articles={row}
              locale={locale}
              layout="row"
              showCategoryChip={false}
            />
          </section>
        );
      })}
    </>
  );
}
