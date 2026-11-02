import Link from 'next/link';
import { papers } from '@/data/papers';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Badania</h1>
          <p>Opracowania wybranych prac naukowych.</p>
        </div>
        <ul>
          {papers.map((paper) => (
            <li key={paper.id}>
              <p>{paper.field}</p>
              <h2>
                <Link href={`/news/${paper.slug}`}>{paper.title}</Link>
              </h2>
              <p>{paper.authors.join(', ')}</p>
              <p>{paper.shortPopularization}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
