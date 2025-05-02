import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to combine class names conditionally and merge Tailwind CSS classes.
 *
 * @param {...ClassValue[]} inputs - The class names (or conditional expressions) to combine.
 * @returns {string} - The final string of merged and combined class names.
 *
 * @description
 * This function first uses `clsx` to conditionally join the class names based on the input
 * values, and then uses `twMerge` to merge any conflicting Tailwind CSS classes (e.g., `bg-red-500` and `bg-green-500`).
 */
export function cn(...inputs: ClassValue[]) {
  // Combining and merging class names with `clsx` and `twMerge`
  return twMerge(clsx(inputs))
}
