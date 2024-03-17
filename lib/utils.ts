export const validateString = (
  value: unknown,
  maxLength: number
): value is string => {
  if (!value || typeof value !== 'string' || value.length > maxLength) {
    return false;
  }

  return true;
};

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message);
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Something went wrong';
  }

  return message;
};

// Helper type to get all of the keys in a nested type.
export type ObjectKeys<
  // T = passed type, extend to be a an object with unknown value types.
  T extends Record<string, unknown>,
  // Key = keys of passed type.
  Key = keyof T
> =
  // Check if key is a string.
  Key extends string
    ? // Continue to check if key has nested objects.
      T[Key] extends Record<string, unknown>
      ? // If nested object is found, recursively run the ObjectKeys on it.
        `${Key}.${ObjectKeys<T[Key]>}`
      : // If nested object is not found, return the key.
        `${Key}`
    : // Return nothing.
      never;
