import { getTranslations } from 'next-intl/server';
import type { ArticleDetail } from '@/data/articles';
import type { AppLocale } from '@/i18n/routing';
import { NewsArticleView } from './NewsArticleView';

export async function NewsArticle({
  article,
  locale,
}: {
  article: ArticleDetail;
  locale: AppLocale;
}) {
  const t = await getTranslations({ locale });

  return (
    <NewsArticleView
      article={article}
      copy={{
        bodyHeading: t('News.bodyHeading'),
        source: t('News.source'),
        viewOriginal: t('News.viewOriginal'),
        download: t('News.download'),
        opensNewTab: t('News.opensNewTab'),
      }}
    />
  );
}
