export const locales = ['en', 'pl', 'de', 'fr', 'es'] as const;

export type AppLocale = (typeof locales)[number];
