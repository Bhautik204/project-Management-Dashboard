import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
 build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react-vendor';
            }
            if (id.includes('chart.js')) {
              return 'chart-vendor';
            }
            return 'vendor';
          }
        }
      }
    }
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
