import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/Button/Button';
import { NewsArticle } from '@/components/NewsArticle/NewsArticle';
import { Link } from '@/i18n/navigation';
import styles from './page.module.css';

export default async function NewsPage({
  params,
}: PageProps<'/[locale]/news/[slug]'>) {
  const { slug } = await params;
  const t = await getTranslations();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          Badania<span>*</span>
        </Link>
        <nav className={styles.nav}>
          <Button href="/" variant="secondary">
            {t('Nav.stories')}
          </Button>
        </nav>
      </header>

      <main className={styles.main}>
        <NewsArticle slug={slug} />
      </main>
    </div>
  );
}
