import { defineRouting } from 'next-intl/routing';
import { locales, type AppLocale } from './routing.types';

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
});

export const localeLabels: Record<AppLocale, string> = {
  en: 'EN',
  pl: 'PL',
  de: 'DE',
  fr: 'FR',
  es: 'ES',
};

export const localeNames: Record<AppLocale, string> = {
  en: 'English',
  pl: 'Polski',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
};
