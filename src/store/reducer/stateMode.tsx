// Import necessary functions from '@reduxjs/toolkit' for creating slices and handling actions
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the type for the slice state
// StateModeType represents the structure of the mode state, with a string 'isDark' to track if dark mode is enabled
export type StateModeType = {
  isDark: string
}

// Define the initial state of the mode slice
// By default, 'isDark' is null (which could be interpreted as an undefined or unset value)
const initialState: StateModeType = {
  isDark: null,
}

// Create a Redux slice to manage the state of dark mode (light/dark theme toggle)
const stateModeSlice = createSlice({
  name: 'mode', // Define the slice name as 'mode'
  initialState, // Set the initial state defined above
  reducers: {
    // Define a reducer that will handle changes to the state of dark mode
    setStateMode: (state, action: PayloadAction<StateModeType>) => {
      // Destructure the 'isDark' value from the action payload
      const { isDark } = action.payload
      // Update the state with the new value for 'isDark'
      state.isDark = isDark
    },
  },
})

// Export the action created by the slice to be used in components or other parts of the app
export const { setStateMode } = stateModeSlice.actions

// Export a selector to access the mode state from the store
export const getModeSlice = (state: { stateMode: StateModeType }) =>
  state.stateMode

// Export the reducer to be included in the Redux store configuration
export default stateModeSlice.reducer
