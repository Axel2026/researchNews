import type { AppLocale } from '@/i18n/routing.types';

export type LanguageOptionProps = {
  code: AppLocale;
  current: boolean;
  pathname: string;
};
