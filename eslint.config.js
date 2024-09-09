import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist/", "node_modules/"] },
  {
    rules: {
      "eol-last": "error",
      "@typescript-eslint/ban-types": "warn",
    },
  },
  { files: ["**/*.ts"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
