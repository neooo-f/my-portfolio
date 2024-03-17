// Define a type for a nested key-value pair translation object.
type TranslationKeyValue = {
  [key: string]: string | string[] | TranslationKeyValue;
};

/**
 * Get translation value string based on a given key and translation.
 * @param keys Translation keys in an array of strings.
 * @param translation Translation object with key-value pair(s).
 * @returns Translation value string or translation object with key-value pairs.
 */
function getTranslationValue(
  keys: string[],
  translation: TranslationKeyValue | string | string[]
): /*TranslationKeyValue |*/ string | string[] {
  // Translation is type of string, return translation.

  if (typeof translation === 'string' || Array.isArray(translation)) {
    return translation;
  }

  // Translation doesn't exist or keys array is empty, return an empty string.
  if (!translation || keys.length === 0) {
    return '';
  }

  // Assing first key in keys array and remove it from keys array.
  const key: string = keys.shift() || '';

  // Recursively call itself with remaining keys.
  return getTranslationValue(keys, translation[key]);
}

/**
 * Get translation value based on a given key and translation.
 * @param key Translation key string.
 * @param translation Translation object with key-value pairs.
 * @returns Translation value in string.
 */
export default function getTranslationByKey(
  key: string | string[],
  translation: TranslationKeyValue
): string | string[] {
  // Convert key in to an array of keys in case of nested keys.
  const keys = Array.isArray(key) ? key : key.split('.');

  // Get translation value.
  const translationValue = getTranslationValue(keys, translation);

  // Translation value doesn't exists or its type is not a string, return key.
  if (
    !translationValue ||
    (typeof translationValue !== 'string' && !Array.isArray(translationValue))
  ) {
    return key;
    // return keys.join('.');
  }

  // Return translation value.
  return translationValue;
}
