/**
 * Capitalizes the first character of a string.
 * Leaves the rest of the string untouched.
 */
const capitalize = str =>
  !str ? str : str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Capitalizes the first letter of each word in a sentence,
 * except for words in the skipWords list (case-insensitive),
 * unless it's the first word. If a skipWord is already capitalized,
 * it’s left as-is; otherwise it’s lowercased.
 *
 * @param {string} sentence
 * @param {string[]} skipWords — words to skip (default ['or','and'])
 * @returns {string}
 */
export function capitalizeWordsExcept(
  sentence,
  skipWords = ['or', 'and']
) {
  const skips = new Set(skipWords.map(w => w.toLowerCase()));

  return sentence
    .split(/\s+/)
    .map((word, i) => {
      if (!word) return word;

      const lower = word.toLowerCase();

      // skip interior words that match skipWords
      if (i > 0 && skips.has(lower)) {
        // preserve existing capitalization, else force lowercase
        return word[0] === word[0].toUpperCase() ? word : lower;
      }

      return capitalize(word);
    })
    .join(' ');
}

// Utility to safely return a string or default to an empty string
export const getSafeString = (val) => val || '';

/**
 * Compares two strings with fallback handling for missing values.
 * - Treats undefined/null/empty values as empty strings.
 * - Places rows with missing values at the end.
 */
export const compareStringsWithFallback = (aVal, bVal) => {
  if (!aVal && !bVal) return 0; // both missing → equal
  if (!aVal) return 1;          // a is missing → comes after b
  if (!bVal) return -1;         // b is missing → comes after a
  return aVal.localeCompare(bVal); // both present → do string comparison
};
