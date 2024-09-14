import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
  },
  plugins: [handlebars()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/global.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
