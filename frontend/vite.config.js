import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true, // Needed for Docker container port mapping (same as --host)
    port: 5173,
    watch: {
      usePolling: true, // Forces polling so Windows saves trigger inside Linux
      interval: 100, // Checks for changes every 100ms
    },
  },
});
