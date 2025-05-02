import path from 'path'; // Importing the 'path' module to handle file and directory paths
import { fileURLToPath } from 'url'; // Importing 'fileURLToPath' to convert a URL to a file path
import react from '@vitejs/plugin-react-swc'; // Importing the Vite plugin for React with SWC support
import { defineConfig } from 'vite'; // Importing 'defineConfig' to define the Vite configuration
// Convert import.meta.url to __dirname (the directory name of the current module file)
var __filename = fileURLToPath(import.meta.url); // Get the full path of the current file from import.meta.url
var __dirname = path.dirname(__filename); // Get the directory name from the full file path
// Vite configuration export
export default defineConfig({
    // Define the plugins to be used by Vite
    plugins: [react()], // Using the React plugin with SWC for faster builds and transforms
    resolve: {
        // Define alias to simplify import paths
        alias: {
            // '@' will resolve to './src' directory
            '@': path.resolve(__dirname, './src'),
        },
    },
});
