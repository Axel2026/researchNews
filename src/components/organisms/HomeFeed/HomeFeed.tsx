import { getTranslations } from 'next-intl/server';
import type { ArticleCategory, ArticleListItem } from '@/data/articles';
import type { AppLocale } from '@/i18n/routing';
import { HomeFeedView } from './HomeFeedView';

export async function HomeFeed({
  articles,
  categories,
  locale,
}: {
  articles: ArticleListItem[];
  categories: ArticleCategory[];
  locale: AppLocale;
}) {
  const t = await getTranslations({ locale });

  return (
    <HomeFeedView
      articles={articles}
      categories={categories}
      locale={locale}
      copy={{
        kicker: t('Home.kicker'),
        readStory: t('Home.readStory'),
        popularTitle: t('Home.popularTitle'),
        popularDek: t('Home.popularDek'),
        latestTitle: t('Home.latestTitle'),
        latestDek: t('Home.latestDek'),
        more: t('Home.more'),
        moreIn: (field) => t('Home.moreIn', { field }),
      }}
    />
  );
}
