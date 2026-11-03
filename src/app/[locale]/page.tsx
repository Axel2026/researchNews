import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { HomeFeed } from '@/components/HomeFeed/HomeFeed';
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import { getEditionDateIso, listPapers } from '@/data/papers';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import styles from './page.module.css';

export const revalidate = 10800;

function formatEditionDate(isoDate: string, locale: string) {
  return Temporal.PlainDate.from(isoDate).toLocaleString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function Home({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale });
  const [papers, editionDateIso] = await Promise.all([
    listPapers(locale),
    getEditionDateIso(),
  ]);
  const editionDate = formatEditionDate(editionDateIso, locale);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.logo}
            src="/images/logo.svg"
            alt="ResearchNews"
            width={2048}
            height={683}
          />
        </Link>
        <div className={styles.headerEnd}>
          <nav className={styles.nav} aria-label={t('Nav.main')}>
            <Link className={styles.navCurrent} href="/" aria-current="page">
              {t('Nav.stories')}
            </Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </header>

      <main id="main" tabIndex={-1} className={styles.main}>
        <time className={styles.edition} dateTime={editionDateIso}>
          {editionDate}
        </time>
        <h1 className={styles.masthead}>{t('Home.masthead')}</h1>
        <p className={styles.subtitle}>{t('Home.subtitle')}</p>
        <HomeFeed papers={papers} locale={locale} />
      </main>
    </div>
  );
}
