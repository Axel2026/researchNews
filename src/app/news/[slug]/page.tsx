import Link from 'next/link';
import styles from './page.module.css';

export default async function NewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Miejsce na opracowanie badania</h1>
        <p className={styles.slug}>
          Identyfikator trasy (slug): <span>{slug}</span>
        </p>
        <p>
          <Link href="/">Powrót na stronę główną</Link>
        </p>
      </main>
    </div>
  );
}
