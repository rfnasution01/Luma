// Import necessary dependencies for ESLint configuration
import js from '@eslint/js' // Base JavaScript configuration from ESLint
import globals from 'globals' // Global variable definitions for different environments
import reactHooks from 'eslint-plugin-react-hooks' // ESLint plugin for React Hooks linting
import reactRefresh from 'eslint-plugin-react-refresh' // ESLint plugin for React Refresh
import tseslint from 'typescript-eslint' // ESLint configuration for TypeScript

// Export the ESLint configuration using TypeScript-eslint's configuration function
export default tseslint.config(
  { ignores: ['dist'] }, // Directories to be ignored by ESLint (e.g., build output)
  {
    // Extend ESLint's recommended configuration along with TypeScript's recommended rules
    extends: [js.configs.recommended, ...tseslint.configs.recommended],

    // Specify file types to lint, in this case, TypeScript and TypeScript JSX (tsx)
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      ecmaVersion: 2020, // Set ECMAScript version to 2020
      globals: globals.browser, // Define global variables for browser environment
    },

    // Define plugins for additional linting rules
    plugins: {
      'react-hooks': reactHooks, // Include React Hooks rules
      'react-refresh': reactRefresh, // Include React Refresh rules
    },

    // Custom rules, merging the recommended React Hooks rules with additional ones
    rules: {
      ...reactHooks.configs.recommended.rules, // Use all recommended React Hooks rules
      'react-refresh/only-export-components': [
        'warn', // Issue a warning when components are not exported properly for React Refresh
        { allowConstantExport: true }, // Allow constant exports to not trigger the warning
      ],
    },
  },
)
