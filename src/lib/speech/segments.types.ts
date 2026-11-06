import type { ArticleDetail } from '@/data/articles.types';
import type { AppLocale } from '@/i18n/routing.types';

export type SpeechLangParams = {
  locale: AppLocale;
};

export type BuildSpeechSegmentsParams = {
  article: ArticleDetail;
  bodyHeading: string;
};
