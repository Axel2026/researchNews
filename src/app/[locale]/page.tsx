import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Header } from '@/components/organisms/Header/Header';
import { HomeFeed } from '@/components/organisms/HomeFeed/HomeFeed';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import {
  getEditionDateIso,
  listArticles,
  listCategories,
} from '@/data/articles';
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
    <PageShell header={<Header current="stories" categories={categories} />}>
      <time className={styles.edition} dateTime={editionDateIso}>
        {editionDate}
      </time>
      <h1 className={styles.masthead}>{t('Home.masthead')}</h1>
      <p className={styles.subtitle}>{t('Home.subtitle')}</p>
      <HomeFeed articles={articles} categories={categories} locale={locale} />
    </PageShell>
  );
}
