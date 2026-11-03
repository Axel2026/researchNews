import type { ArticleListItem } from '@/data/articles';
import { Link } from '@/i18n/navigation';
import styles from '@/app/[locale]/page.module.css';

export function CategoryFeed({ articles }: { articles: ArticleListItem[] }) {
  return (
    <ul className={styles.latestGrid}>
      {articles.map((article) => (
        <li key={article.id}>
          <article className={styles.card}>
            <div className={styles.cardMedia}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.imageUrl} alt="" width={1600} height={900} />
            </div>
            <h2 className={styles.cardTitle}>
              <Link href={`/news/${article.slug}`}>{article.title}</Link>
            </h2>
            <p className={styles.cardDek}>{article.shortPopularization}</p>
            <p className={styles.chip}>{article.field}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}
