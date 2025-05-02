// Import necessary functions from Redux Toolkit's query module for creating API slices
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define the type for the metadata related to API responses
// Meta includes pagination information such as page number, limit, count, total, and last page
export type Meta = {
  page?: number
  limit?: number
  count?: number
  total?: number
  last_page?: number
}

// Define a generic type for the API response structure
// Res<T, M> is the general response structure, where:
// - T is the data returned by the API
// - M is an optional mapped value (default is undefined)
export type Res<T, M = undefined> = {
  status: boolean // Indicates if the request was successful or not
  message: string // A message related to the request (could be success/error message)
  data: T // The main data returned from the API
  related: T // Related data returned from the API
  meta: Meta // Pagination metadata
  mapped?: M // An optional mapped field (may contain additional transformed data)
}

// Define the base URL for the API
// The base URL is fetched from environment variables (VITE_BASE_URL)
const baseURL = import.meta.env.VITE_BASE_URL

// Create an API slice using 'createApi' from Redux Toolkit
// This slice will be responsible for making requests and managing API data
export const api = createApi({
  // Define the base query for API requests, using fetchBaseQuery which makes HTTP requests
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL, // Use the base URL defined above
  }),
  tagTypes: [], // Tag types for cache management (empty here, but can be used for caching invalidation)

  // Define the endpoints (empty here, as the API slice will have endpoints injected later)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_builder) => ({}),
})
