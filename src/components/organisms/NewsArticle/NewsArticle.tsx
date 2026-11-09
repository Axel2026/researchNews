import { getTranslations } from 'next-intl/server';
import { JsonLd } from '@/components/atoms/JsonLd/JsonLd';
import { articleJsonLd } from '@/lib/seo';
import { ArticleDiscussion } from '@/components/organisms/ArticleDiscussion/ArticleDiscussion';
import { BookmarkButton } from '@/components/molecules/BookmarkButton/BookmarkButton';
import { PopularizeButton } from '@/components/molecules/PopularizeButton/PopularizeButton';
import { ArticleViewBeacon } from './ArticleViewBeacon/ArticleViewBeacon';
import { NewsArticleView } from './NewsArticleView/NewsArticleView';
import type { NewsArticleProps } from './NewsArticle.types';

export async function NewsArticle({ article, locale }: NewsArticleProps) {
  const t = await getTranslations({ locale });

  function published(date: string) {
    return t('News.published', { date });
  }

  const copy = {
    bodyHeading: t('News.bodyHeading'),
    source: t('News.source'),
    published,
    viewOriginal: t('News.viewOriginal'),
    download: t('News.download'),
    opensNewTab: t('News.opensNewTab'),
    communityNotice: article.communityPopularization
      ? article.popularizationModel
        ? t('Popularize.noticeModel', {
            name: article.communityPopularization.displayName,
            model: article.popularizationModel,
          })
        : t('Popularize.notice', {
            name: article.communityPopularization.displayName,
          })
      : undefined,
  };
  const jsonLd = articleJsonLd({
    article,
    locale,
    siteName: t('Metadata.title'),
  });
  const popularizeAction = article.needsPopularization ? (
    <PopularizeButton slug={article.slug} />
  ) : null;

  return (
    <>
      <ArticleViewBeacon slug={article.slug} />
      <JsonLd data={jsonLd} />
      <NewsArticleView
        article={article}
        locale={locale}
        bookmarkAction={<BookmarkButton slug={article.slug} />}
        popularizeAction={popularizeAction}
        discussion={
          <ArticleDiscussion key={article.slug} slug={article.slug} />
        }
        copy={copy}
      />
    </>
  );
}
