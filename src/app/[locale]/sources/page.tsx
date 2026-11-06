import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Header } from '@/components/organisms/Header/Header';
import { SourceList } from '@/components/organisms/SourceList/SourceList';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import { listCategories } from '@/data/articles';
import { listSources } from '@/data/sources';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import {
  defaultSocialImage,
  ogLocaleByAppLocale,
  pageAlternates,
} from '@/lib/seo';
import type { SourcesPageProps } from './page.types';

export const revalidate = 10800;

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/sources'>): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Sources' });
  const title = t('title');
  const description = t('dek');
  const href = '/sources';

  return {
    title,
    description,
    alternates: pageAlternates(locale, href),
    openGraph: {
      type: 'website',
      locale: ogLocaleByAppLocale[locale],
      title,
      description,
      url: getPathname({ locale, href }),
      images: [{ ...defaultSocialImage, alt: title }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [defaultSocialImage.url],
    },
  };
}

export default async function SourcesPage({ params }: SourcesPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const [sources, categories] = await Promise.all([
    listSources(locale),
    listCategories(locale),
  ]);

  return (
    <PageShell header={<Header current="sources" categories={categories} />}>
      <SourceList sources={sources} locale={locale} />
    </PageShell>
  );
}
