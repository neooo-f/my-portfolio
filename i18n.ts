export const i18nConfig = {
    defaultLocale: 'en',
    locales: ['de', 'en', 'fr', 'it'],
  } as const;
  
export type Locale = (typeof i18nConfig)['locales'][number];