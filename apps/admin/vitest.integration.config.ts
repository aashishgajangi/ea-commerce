import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/__tests__/**/*.integration.test.{ts,tsx}"],
    exclude: [
      "**/__tests__/**/!(*.integration).test.{ts,tsx}",
      "node_modules/**",
    ],
    globals: true,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
