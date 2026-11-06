import { getTranslations } from 'next-intl/server';
import { HomeFeedView } from './HomeFeedView/HomeFeedView';
import type { HomeFeedProps } from './HomeFeed.types';

export async function HomeFeed({
  articles,
  categories,
  locale,
}: HomeFeedProps) {
  const t = await getTranslations({ locale });

  function moreIn(field: string) {
    return t('Home.moreIn', { field });
  }

  const copy = {
    kicker: t('Home.kicker'),
    readStory: t('Home.readStory'),
    popularTitle: t('Home.popularTitle'),
    popularDek: t('Home.popularDek'),
    latestTitle: t('Home.latestTitle'),
    latestDek: t('Home.latestDek'),
    more: t('Home.more'),
    moreIn,
  };

  return (
    <HomeFeedView
      articles={articles}
      categories={categories}
      locale={locale}
      copy={copy}
    />
  );
}
