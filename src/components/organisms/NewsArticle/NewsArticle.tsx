import { getTranslations } from 'next-intl/server';
import { JsonLd } from '@/components/atoms/JsonLd/JsonLd';
import type { ArticleDetail } from '@/data/articles';
import type { AppLocale } from '@/i18n/routing';
import { articleJsonLd } from '@/lib/seo';
import { ArticleDiscussion } from '@/components/organisms/ArticleDiscussion/ArticleDiscussion';
import { BookmarkButton } from '@/components/molecules/BookmarkButton/BookmarkButton';
import { ArticleViewBeacon } from './ArticleViewBeacon';
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
    <>
      <ArticleViewBeacon slug={article.slug} />
      <JsonLd
        data={articleJsonLd({
          article,
          locale,
          siteName: t('Metadata.title'),
        })}
      />
      <NewsArticleView
        article={article}
        locale={locale}
        bookmarkAction={<BookmarkButton slug={article.slug} />}
        discussion={
          <ArticleDiscussion key={article.slug} slug={article.slug} />
        }
        copy={{
          bodyHeading: t('News.bodyHeading'),
          source: t('News.source'),
          published: (date) => t('News.published', { date }),
          viewOriginal: t('News.viewOriginal'),
          download: t('News.download'),
          opensNewTab: t('News.opensNewTab'),
        }}
      />
    </>
  );
}
