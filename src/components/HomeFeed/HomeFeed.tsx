import { ArticleCardGrid } from '@/components/ArticleCardGrid/ArticleCardGrid';
import type { ArticleCategory, ArticleListItem } from '@/data/articles';
import { Link } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import styles from '@/app/[locale]/page.module.css';

const HOME_ROW_SIZE = 4;

export type HomeFeedCopy = {
  kicker: string;
  readStory: string;
  latestTitle: string;
  latestDek: string;
  more: string;
  moreIn: string;
};

export function HomeFeedView({
  articles,
  categories,
  copy,
}: {
  articles: ArticleListItem[];
  categories: ArticleCategory[];
  copy: HomeFeedCopy;
}) {
  const [featured, ...rest] = articles;
  const latest = rest.slice(0, HOME_ROW_SIZE);

  return (
    <>
      {featured ? (
        <article className={styles.featured}>
          <div className={styles.featuredMedia}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featured.imageUrl} alt="" width={1600} height={900} />
          </div>
          <div className={styles.featuredCopy}>
            <p className={styles.kicker}>{copy.kicker}</p>
            <h2 className={styles.featuredTitle}>
              <Link href={`/news/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p className={styles.featuredDek}>{featured.shortPopularization}</p>
            <p className={styles.chip}>{featured.field}</p>
            <Link className={styles.storyLink} href={`/news/${featured.slug}`}>
              {copy.readStory} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      ) : null}

      {latest.length > 0 ? (
        <section className={styles.latest} aria-labelledby="latest-heading">
          <div className={styles.latestHeader}>
            <div className={styles.latestHeaderCopy}>
              <h2 id="latest-heading">{copy.latestTitle}</h2>
              <p>{copy.latestDek}</p>
            </div>
          </div>
          <ArticleCardGrid articles={latest} layout="row" />
        </section>
      ) : null}

      {categories.map((category) => {
        const row = articles
          .filter((article) => article.field === category.field)
          .slice(0, HOME_ROW_SIZE);

        if (row.length === 0) {
          return null;
        }

        const headingId = `category-${category.slug}-heading`;
        const moreIn = copy.moreIn.replaceAll('{field}', category.field);

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
              layout="row"
              showCategoryChip={false}
            />
          </section>
        );
      })}
    </>
  );
}

export async function HomeFeed({
  articles,
  categories,
  locale,
}: {
  articles: ArticleListItem[];
  categories: ArticleCategory[];
  locale: AppLocale;
}) {
  const t = await getTranslations({ locale });

  return (
    <HomeFeedView
      articles={articles}
      categories={categories}
      copy={{
        kicker: t('Home.kicker'),
        readStory: t('Home.readStory'),
        latestTitle: t('Home.latestTitle'),
        latestDek: t('Home.latestDek'),
        more: t('Home.more'),
        moreIn: t('Home.moreIn'),
      }}
    />
  );
}
