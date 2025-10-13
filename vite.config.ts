import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Ensure the 'vite' module is installed by running 'npm install vite' in the terminal.

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api/contact': {
        target: 'https://formspree.io/f/xovlgyzr',
        changeOrigin: true,
        secure: true,
        headers: {
          'Accept': 'application/json',
        },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
