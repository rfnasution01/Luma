/* eslint-disable @typescript-eslint/no-explicit-any */
// Disable the ESLint rule that disallows the use of 'any' type in TypeScript

// Declare a module for paths that start with '@/' (aliased path in the project)
declare module '@/*' {
  // Define the content of this module as 'any' type
  const content: any

  // Export the content of the module
  export default content
}
