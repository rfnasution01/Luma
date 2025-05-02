import { useLocation } from 'react-router-dom'

/**
 * Custom hook to extract and return path segments from the current URL.
 *
 * @returns {object} - An object containing the full pathname and individual path segments.
 */
export const usePathname = () => {
  // Extracting the current pathname from the URL using the useLocation hook
  const { pathname } = useLocation()

  // Splitting the pathname into segments using '/' as the delimiter
  const splittedPath = pathname?.split('/')

  // Extracting individual path segments using the at() method
  const firstPathname = splittedPath?.at?.(1) // First segment (after '/')
  const secondPathname = splittedPath?.at?.(2) // Second segment
  const thirdPathname = splittedPath?.at?.(3) // Third segment
  const fourthPathname = splittedPath?.at?.(4) // Fourth segment
  const lastPathname = splittedPath?.at?.(-1) // Last segment (the final part of the URL)

  // Returning the pathname, splitted path, and individual path segments
  return {
    pathname,
    splittedPath,
    firstPathname,
    secondPathname,
    thirdPathname,
    lastPathname,
    fourthPathname,
  }
}

/**
 * Function to extract the path segments from a given URL, excluding the leading slash.
 *
 * @param {string} url - The URL string to extract path segments from.
 * @returns {string} - A string containing the path segments after the first slash.
 */
export function getPaths(url: string) {
  // Splitting the URL by '/' and excluding the first empty part
  const parts = url?.split('/')

  // Joining the remaining parts after the first segment and returning them as a string
  const result = parts?.slice(1)?.join('/')

  return result
}
