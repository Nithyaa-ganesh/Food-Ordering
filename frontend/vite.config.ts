import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: [], // You can specify any dependencies to exclude if needed
  },
  build: {
    rollupOptions: {
      external: [], // No external dependencies
    },
  },
  server: {
    port: 4200, // Development server port
  },
  resolve: {
    alias: {
      // If you need to add any aliases, do it here
    },
  },
  define: {
    'process.env': {}, // Define process.env to avoid issues with libraries expecting Node.js process
  },
});


