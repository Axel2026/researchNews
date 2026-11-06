import { getTranslations } from 'next-intl/server';
import { SourceListView } from './SourceListView';
import type { SourceListProps } from './SourceList.types';

export async function SourceList({ sources, locale }: SourceListProps) {
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
