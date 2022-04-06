import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "es2015",
    lib: {
      entry: path.resolve(__dirname, "./src/translator.js"),
      name: "laravel-translator",
      fileName: (format) => `laravel-translator.${format}.js`,
    },
  },
  define: {
    global: {
      Translator: "Translator",
    },
  },
  server: {
    port: 8080,
  },
});
