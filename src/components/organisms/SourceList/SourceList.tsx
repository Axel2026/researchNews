import { getTranslations } from 'next-intl/server';
import type { SourceListItem } from '@/data/sources';
import type { AppLocale } from '@/i18n/routing';
import { SourceListView } from './SourceListView';

export async function SourceList({
  sources,
  locale,
}: {
  sources: SourceListItem[];
  locale: AppLocale;
}) {
  const t = await getTranslations({ locale });

  return (
    <SourceListView
      sources={sources}
      copy={{
        kicker: t('Sources.kicker'),
        title: t('Sources.title'),
        dek: t('Sources.dek'),
        visit: t('Sources.visit'),
        empty: t('Sources.empty'),
        opensNewTab: t('News.opensNewTab'),
      }}
    />
  );
}
