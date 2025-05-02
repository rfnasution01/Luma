module.exports = {
  // Define the root of the configuration file, meaning no parent configurations will be used.
  root: true,

  // Specify the environment for ESLint to understand the global variables
  env: {
    browser: true, // Allows global variables related to the browser environment (e.g., `window`, `document`)
    es2020: true, // Enables ES2020 syntax (e.g., optional chaining, nullish coalescing)
  },

  // Extend the following configurations:
  extends: [
    'eslint:recommended', // Apply ESLint's recommended rules
    'plugin:@typescript-eslint/recommended', // Apply TypeScript-specific recommended rules
    'plugin:react-hooks/recommended', // Enforces best practices for React Hooks
  ],

  // Ignore specific files and directories from linting
  ignorePatterns: ['dist', '.eslintrc.cjs'], // Skip the 'dist' folder and specific ESLint config files

  // Specify the parser for TypeScript files
  parser: '@typescript-eslint/parser', // ESLint will use the TypeScript parser for TS and TSX files

  // List of plugins to enhance the linting process
  plugins: ['react-refresh'], // Plugin to support React Fast Refresh

  // Custom rule configurations
  rules: {
    'react-refresh/only-export-components': [
      'warn', // Issue a warning (instead of an error) for the rule
      { allowConstantExport: true }, // Allow constant exports without triggering the rule
    ],
  },
}
