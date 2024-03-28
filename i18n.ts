export const i18nConfig = {
  defaultLocale: 'de',
  // locales: ['de', 'en', 'fr', 'it'],
  locales: ['de', 'en'],
} as const;

export type Locale = (typeof i18nConfig)['locales'][number];
