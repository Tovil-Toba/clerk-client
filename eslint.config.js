// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const simpleImportSort = require("eslint-plugin-simple-import-sort");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const tailwind = require("eslint-plugin-tailwindcss");
// todo: const sonarjs = require("eslint-plugin-sonarjs");


module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      eslintPluginPrettierRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      "simple-import-sort": simpleImportSort,

    },
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      eslintPluginPrettierRecommended,
      ...tailwind.configs["flat/recommended"]
    ],
    rules: {},
  },
);