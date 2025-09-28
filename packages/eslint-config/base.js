import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    // EA Commerce specific rules for code quality and error handling
    rules: {
      // TypeScript specific (non-type-aware rules)
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",

      // Error handling patterns
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-throw-literal": "error",
      "prefer-promise-reject-errors": "error",

      // Code quality
      "no-var": "error",
      "prefer-const": "error",
      "no-duplicate-imports": "error",
      "no-unused-expressions": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],

      // Async/await patterns
      "require-await": "error",
      "no-return-await": "error",

      // Security
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", ".next/**", "coverage/**"],
  },
];
