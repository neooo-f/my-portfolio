export const i18nConfig = {
  defaultLocale: 'de',
  locales: ['de', 'en'], // expand for more languages
} as const;

export type Locale = (typeof i18nConfig)['locales'][number];
