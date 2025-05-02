/* eslint-disable no-useless-escape */

/**
 * Converts a string to a URL-friendly slug.
 *
 * @param {string} text - The input text to convert into a slug. Defaults to an empty string if no input is provided.
 * @returns {string} - The URL-friendly slug.
 *
 * @description
 * This function takes a string and converts it to a slug that is safe to use in URLs:
 * - Converts all characters to lowercase.
 * - Replaces spaces with hyphens.
 * - Removes non-word characters (anything other than letters, numbers, and hyphens).
 * - Merges multiple hyphens into one.
 * - Strips leading and trailing hyphens.
 */
export function convertToSlug(text = '') {
  return text
    ?.toLowerCase() // Convert to lowercase
    ?.replace(/\s+/g, '-') // Replace spaces with hyphens
    ?.replace(/[^\w\-]+/g, '') // Remove non-word and non-hyphen characters
    ?.replace(/\-\-+/g, '-') // Replace consecutive hyphens with a single hyphen
    ?.replace(/^-+/, '') // Remove leading hyphens
    ?.replace(/-+$/, '') // Remove trailing hyphens
}

/**
 * Converts a URL slug back into a human-readable text format.
 *
 * @param {string} slug - The slug to convert into text.
 * @returns {string} - The human-readable text.
 *
 * @description
 * This function converts a URL slug back into readable text:
 * - Replaces hyphens with spaces.
 * - Capitalizes the first letter of each word.
 */
export function convertSlugToText(slug = '') {
  // Replace hyphens with spaces and capitalize the first letter of each word
  const text = slug
    ?.replace(/-/g, ' ') // Replace hyphens with spaces
    ?.replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter of each word

  return text
}

/**
 * Extracts the initials from a full name.
 *
 * @param {string} name - The full name to extract initials from.
 * @returns {string} - The initials of the name.
 *
 * @description
 * This function takes a full name and returns the initials:
 * - Splits the name by spaces.
 * - Takes the first letter of each word.
 * - Joins the initials together and converts them to uppercase.
 */
export function getInitials(name) {
  const initials = name
    ?.split(' ') // Split the name by spaces
    ?.map((word) => word.charAt(0)) // Get the first letter of each word
    ?.join('') // Join the initials together
    ?.toUpperCase() // Convert to uppercase
  return initials
}
