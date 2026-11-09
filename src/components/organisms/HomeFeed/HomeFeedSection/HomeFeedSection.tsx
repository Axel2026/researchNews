import { ArticleCardGrid } from '@/components/molecules/ArticleCardGrid/ArticleCardGrid';
import { Link } from '@/i18n/navigation';
import styles from './HomeFeedSection.module.css';
import type { HomeFeedSectionProps } from './HomeFeedSection.types';

export function HomeFeedSection({
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

  const linkAriaLabel = moreAriaLabel ?? moreLabel;

  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.header}>
        <div className={styles.headerCopy}>
          <h2 id={headingId}>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {moreHref ? (
          <Link
            className={styles.moreLink}
            href={moreHref}
            aria-label={linkAriaLabel}
          >
            {moreLabel} <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
      <ArticleCardGrid articles={articles} locale={locale} layout="row" />
    </section>
  );
}
