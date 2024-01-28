import { Locale, i18nConfig } from '@/i18n';
import { ObjectKeys } from '@/lib/utils';

// Contains functions to import translation .json files asynchrounously for specified locales.
const translations = {
    de: () => import('@/public/locales/de.json').then((module) => module.default),
    en: () => import('@/public/locales/en.json').then((module) => module.default),
    fr: () => import('@/public/locales/fr.json').then((module) => module.default),
    it: () => import('@/public/locales/it.json').then((module) => module.default),
};

// Define a generated type for translation object.
export type Translation = Awaited<
  ReturnType<(typeof translations)[typeof i18nConfig.defaultLocale]>
>;

// Define a generated type for all nested keys found in Translation type.
export type TranslationObejct = (key: ObjectKeys<Translation>) => string;

/**
 * Loads a translation .json file asynchronously based on a given locale.
 * @param locale Locale string
 * @returns Translation object with translation key-value pairs.
 */
export default async function loadTranslation(
  locale: Locale
): Promise<Translation> {
  // Invoke a call to translations corresponding to a given locale key.
  return translations[locale]();
}