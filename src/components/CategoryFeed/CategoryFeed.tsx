import type { PaperSummary } from '@/data/papers';
import { Link } from '@/i18n/navigation';
import styles from '@/app/[locale]/page.module.css';

export function CategoryFeed({ papers }: { papers: PaperSummary[] }) {
  return (
    <ul className={styles.latestGrid}>
      {papers.map((paper) => (
        <li key={paper.id}>
          <article className={styles.card}>
            <div className={styles.cardMedia}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={paper.imageUrl} alt="" width={1600} height={900} />
            </div>
            <h2 className={styles.cardTitle}>
              <Link href={`/news/${paper.slug}`}>{paper.title}</Link>
            </h2>
            <p className={styles.cardDek}>{paper.shortPopularization}</p>
            <p className={styles.chip}>{paper.field}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}
