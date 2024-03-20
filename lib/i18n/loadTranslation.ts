import { Locale } from '@/i18n';

type TranslationValue = string | string[] | TranslationObject;
interface TranslationObject {
  [key: string]: TranslationValue;
}

const translations: Record<Locale, () => Promise</*TranslationObject*/ any>> = {
  de: () => import('@/public/locales/de.json').then((module) => module.default),
  en: () => import('@/public/locales/en.json').then((module) => module.default),
  fr: () => import('@/public/locales/fr.json').then((module) => module.default),
  it: () => import('@/public/locales/it.json').then((module) => module.default),
};

export type Translation = TranslationObject;

export type TranslationObjectType = (
  key: string | string[]
) => string | string[];

export default async function loadTranslation(
  locale: Locale
): Promise<Translation> {
  return translations[locale]();
}
