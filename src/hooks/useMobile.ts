import { useEffect, useState } from 'react'

/**
 * Custom hook to determine if the user is on a mobile device.
 *
 * @returns {object} - An object with a boolean value indicating whether the view is mobile or not.
 */
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Function to check if the screen size matches mobile criteria
    const checkIsMobile = () => {
      // Checking if the screen width is less than or equal to 34em
      const isMobileView = window.matchMedia('(max-width: 34em)').matches
      setIsMobile(isMobileView) // Update the state with the result
    }

    // Initial check when the component mounts to determine if it's a mobile view
    checkIsMobile()

    // Adding an event listener to check the screen size on window resize
    window.addEventListener('resize', checkIsMobile)

    // Cleanup: removing the event listener when the component unmounts to prevent memory leaks
    return () => window.removeEventListener('resize', checkIsMobile)
  }, []) // Empty dependency array means this effect runs once when the component mounts

  // Returning an object with the current mobile status
  return {
    isMobile,
  }
}
