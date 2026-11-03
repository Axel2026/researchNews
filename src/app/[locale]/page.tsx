import { getLocale, getTranslations } from 'next-intl/server';
import { HomeFeed } from '@/components/HomeFeed/HomeFeed';
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import styles from './page.module.css';

function formatEditionDate(date: Temporal.PlainDate, locale: string) {
  return date
    .toLocaleString(locale, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    .toUpperCase();
}

export default async function Home() {
  const t = await getTranslations();
  const locale = await getLocale();
  const editionDate = formatEditionDate(Temporal.Now.plainDateISO(), locale);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          Badania<span>*</span>
        </Link>
        <div className={styles.headerEnd}>
          <nav className={styles.nav} aria-label={t('Nav.main')}>
            <Link className={styles.navCurrent} href="/">
              {t('Nav.stories')}
            </Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </header>

      <main className={styles.main}>
        <p className={styles.edition}>{editionDate}</p>
        <h1 className={styles.masthead}>{t('Home.masthead')}</h1>
        <p className={styles.subtitle}>{t('Home.subtitle')}</p>
        <HomeFeed />
      </main>
    </div>
  );
}
