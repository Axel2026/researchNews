import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CategoryDropdown } from '@/components/molecules/CategoryDropdown/CategoryDropdown';
import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher/LanguageSwitcher';
import { AccountMenu } from '@/components/organisms/AccountMenu/AccountMenu';
import { HomeFeed } from '@/components/organisms/HomeFeed/HomeFeed';
import {
  getEditionDateIso,
  listArticles,
  listCategories,
} from '@/data/articles';
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
  const [articles, editionDateIso, categories] = await Promise.all([
    listArticles(locale),
    getEditionDateIso(),
    listCategories(locale),
  ]);
  const editionDate = formatEditionDate(editionDateIso, locale);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerBar}>
          <div className={styles.headerStart}>
            <Link className={styles.brand} href="/" aria-label="ResearchNews">
              {/* eslint-disable-next-line @next/next/no-img-element -- next/image does not optimize SVG */}
              <img
                className={styles.logo}
                src="/images/logo.svg"
                alt="ResearchNews"
                width={2048}
                height={683}
              />
            </Link>
            <nav className={styles.nav} aria-label={t('Nav.main')}>
              <Link className={styles.navLink} href="/" aria-current="page">
                {t('Nav.stories')}
              </Link>
              <CategoryDropdown categories={categories} />
            </nav>
          </div>
          <div className={styles.headerActions}>
            <AccountMenu />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1} className={styles.main}>
        <time className={styles.edition} dateTime={editionDateIso}>
          {editionDate}
        </time>
        <h1 className={styles.masthead}>{t('Home.masthead')}</h1>
        <p className={styles.subtitle}>{t('Home.subtitle')}</p>
        <HomeFeed articles={articles} categories={categories} locale={locale} />
      </main>
    </div>
  );
}
