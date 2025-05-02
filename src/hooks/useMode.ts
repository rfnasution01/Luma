import { getModeSlice } from '@/store/reducer/stateMode' // Importing the selector to get the mode state
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

/**
 * Custom hook to manage theme mode (light or dark).
 *
 * @returns {object} - An object containing the current mode and a setter function to change the mode.
 */
export function useMode() {
  // Getting the current theme mode (dark or light) from the Redux state
  const stateMode = useSelector(getModeSlice)?.isDark

  // Effect hook to update the mode state whenever the Redux state for mode changes
  useEffect(() => {
    if (stateMode) {
      // Set the mode state to match the Redux state value when it is available
      setMode(stateMode)
    }
  }, [stateMode]) // The effect runs when the `stateMode` value changes

  // Retrieving the theme mode from localStorage, if it exists
  const modeParams = localStorage.getItem('themeMode')

  // The base mode defined in environment variables (used as a fallback)
  const baseMode = import.meta.env.VITE_BASE_MODE

  // Initializing the state mode with a fallback priority: localStorage -> Redux state -> base mode
  const [mode, setMode] = useState<string>(modeParams ?? stateMode ?? baseMode)

  // Returning the current mode and a function to change the mode
  return {
    mode,
    setMode,
  }
}
