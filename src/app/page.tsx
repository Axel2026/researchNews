import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Badania</h1>
          <p>Lista opracowań pojawi się później.</p>
        </div>
        <p className={styles.hint}>
          <Link href="/news/przykladowe-badanie">
            Przykładowa strona opracowania
          </Link>
        </p>
      </main>
    </div>
  );
}
