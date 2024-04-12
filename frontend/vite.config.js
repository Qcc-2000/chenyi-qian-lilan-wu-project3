import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();
// eslint-disable-next-line no-undef
const isProduction = process.env.NODE_ENV === "production";
console.log("isProduction", isProduction);
// eslint-disable-next-line no-undef
console.log("backend url", process.env.BACKEND_URL_PROD);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: isProduction
          ? // eslint-disable-next-line no-undef
            process.env.BACKEND_URL_PROD
          : "http://localhost:8000/",
        changeOrigin: true,
      },
    },
  },
});
