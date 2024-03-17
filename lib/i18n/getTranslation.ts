import { Locale } from '@/i18n';
import getTranslationByKey from '@/lib/i18n/getTranslationByKey';
import loadTranslation, {
  TranslationObjectType,
} from '@/lib/i18n/loadTranslation';
import 'server-only';

/**
 * Get translation object on server-side based on a given locale.
 * @param locale
 * @returns
 */
export default async function getTranslation(
  locale: Locale
): Promise<TranslationObjectType> {
  // Load translation content from a file based on locale.
  const translation = await loadTranslation(locale);

  // Return translation data.
  return (key: string | string[]) => getTranslationByKey(key, translation);
}
