import { getArticleParagraphs } from '@/data/articles';
import type { AppLocale } from '@/i18n/routing.types';
import type { SpeechSegment } from './speech.types';
import type {
  SpeechLangParams,
  BuildSpeechSegmentsParams,
} from './segments.types';

const speechLanguages: Record<AppLocale, string> = {
  en: 'en-US',
  pl: 'pl-PL',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
};

export function speechLang({ locale }: SpeechLangParams): string {
  return speechLanguages[locale];
}

export function buildSpeechSegments({
  article,
  bodyHeading,
}: BuildSpeechSegmentsParams): SpeechSegment[] {
  const segments: SpeechSegment[] = [];

  const push = (id: string, text: string) => {
    const trimmed = text.trim();
    if (trimmed) {
      segments.push({ id, text: trimmed });
    }
  };

  push('title', article.title);
  push('dek', article.shortPopularization);

  getArticleParagraphs({ article, field: 'mediumPopularization' }).forEach(
    (paragraph, index) => {
      push(`summary-${index}`, paragraph);
    },
  );

  push('body-heading', bodyHeading);

  getArticleParagraphs({ article, field: 'fullPopularization' }).forEach(
    (paragraph, index) => {
      push(`body-${index}`, paragraph);
    },
  );

  return segments;
}
