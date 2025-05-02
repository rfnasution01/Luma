// Import necessary functions from '@reduxjs/toolkit' to configure the Redux store
import { configureStore } from '@reduxjs/toolkit'

// Import the API slice and the stateMode reducer to include in the store
import { api } from './api'
import stateMode from './reducer/stateMode.tsx'
import stateTab from './reducer/stateTab.ts'
import stateLoading from './reducer/stateLoading.ts'

// Configure the Redux store using 'configureStore' from Redux Toolkit
// This function sets up the store with reducers, middleware, and other configurations
export const store = configureStore({
  reducer: {
    // Register the API reducer with its associated 'reducerPath' for managing API state
    [api.reducerPath]: api.reducer,
    // Register the stateMode reducer to manage the dark mode state
    stateMode: stateMode,
    stateTab: stateTab,
    stateLoading: stateLoading,
  },
  // Enable Redux DevTools for debugging the store during development
  devTools: true,
  // Add middleware to enhance store functionality
  // In this case, the API middleware is added to handle cache management, automatic fetching, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

// Define the RootState type that represents the entire state structure of the store
// This type can be used in selectors to access the state in a type-safe manner
export type RootState = ReturnType<typeof store.getState>

// Define the AppDispatch type to represent the dispatch function
// This type is useful for dispatching actions in a type-safe way
export type AppDispatch = typeof store.dispatch
