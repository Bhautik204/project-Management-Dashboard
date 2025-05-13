import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Example: Separate vendor libraries into their own chunks
          if (id.includes('node_modules')) {
            if (id.includes('vue')) {
              return 'vendor_vue';
            }
            if (id.includes('chart.js')) {
              return 'vendor_chartjs';
            }
            // Add more conditions as needed for other libraries
            return 'vendor';
          }
        },
      },
    },
    // Optional: Increase the chunk size warning limit if necessary
    chunkSizeWarningLimit: 1000, // in KB
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8800",
        changeOrigin: true,
      },
    },
  },
});
