import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isDev = command === "serve";

  return {
    server: {
      host: "::",
      port: 8080,
    },
    build: {
      outDir: "dist/spa",
      sourcemap: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        onwarn(warning, warn) {
          // Suppress chunk size warnings for production
          if (warning.code === "LARGE_BUNDLE") return;
          warn(warning);
        },
      },
    },
    plugins: [
      react(),
      ...(isDev ? [expressPlugin()] : []), // Only apply express in dev mode
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./client"),
        "@shared": path.resolve(__dirname, "./shared"),
      },
    },
    define: {
      // Ensure environment variables work in production
      "process.env.NODE_ENV": '"production"',
    },
  };
});

// Express plugin for local dev
function expressPlugin(): Plugin {
  return {
    name: "express-dev-plugin",
    apply: "serve",
    configureServer(server) {
      // Only load server in development
      try {
        const { createServer } = require("./server");
        const app = createServer();
        server.middlewares.use(app);
      } catch (error) {
        console.warn("Server not available in production build");
      }
    },
  };
}
