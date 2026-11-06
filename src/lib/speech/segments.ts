import { getArticleParagraphs, type ArticleDetail } from '@/data/articles';
import type { AppLocale } from '@/i18n/routing';
import type { SpeechSegment } from './types';

const speechLanguages: Record<AppLocale, string> = {
  en: 'en-US',
  pl: 'pl-PL',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
};

export function speechLang(locale: AppLocale): string {
  return speechLanguages[locale];
}

export function buildSpeechSegments(
  article: ArticleDetail,
  bodyHeading: string,
): SpeechSegment[] {
  const segments: SpeechSegment[] = [];

  const push = (id: string, text: string) => {
    const trimmed = text.trim();
    if (trimmed) {
      segments.push({ id, text: trimmed });
    }
  };

  push('title', article.title);
  push('dek', article.shortPopularization);

  getArticleParagraphs(article, 'mediumPopularization').forEach(
    (paragraph, index) => {
      push(`summary-${index}`, paragraph);
    },
  );

  push('body-heading', bodyHeading);

  getArticleParagraphs(article, 'fullPopularization').forEach(
    (paragraph, index) => {
      push(`body-${index}`, paragraph);
    },
  );

  return segments;
}
