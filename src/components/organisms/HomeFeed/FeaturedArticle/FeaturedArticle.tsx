import { ArticleImage } from '@/components/atoms/ArticleImage/ArticleImage';
import { CategoryChip } from '@/components/atoms/CategoryChip/CategoryChip';
import { mediaMinLg } from '@/design-system/tokens';
import { Link } from '@/i18n/navigation';
import styles from './FeaturedArticle.module.css';
import type { FeaturedArticleProps } from './FeaturedArticle.types';

export function FeaturedArticle({
  article,
  headingId,
  kicker,
  readStory,
}: FeaturedArticleProps) {
  const articleHref = `/article/${article.slug}`;
  const imageSizes = `${mediaMinLg} 50vw, 100vw`;

  return (
    <article className={styles.article} aria-labelledby={headingId}>
      <div className={styles.media}>
        <ArticleImage
          src={article.imageUrl}
          alt={article.title}
          sizes={imageSizes}
          priority
        />
      </div>
      <div className={styles.copy}>
        <p className={styles.kicker}>{kicker}</p>
        <h2 id={headingId} className={styles.title}>
          <Link href={articleHref}>{article.title}</Link>
        </h2>
        <p className={styles.dek}>{article.shortPopularization}</p>
        <CategoryChip field={article.field} />
        <span className={styles.storyLink}>
          {readStory} <span aria-hidden="true">→</span>
        </span>
      </div>
    </article>
  );
}
