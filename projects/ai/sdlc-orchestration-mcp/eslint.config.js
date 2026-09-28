import security from "eslint-plugin-security";

export default [
  {
    ignores: ["node_modules/**", "docs/**", "coverage/**", "tmp/**", "**/*.md"],
  },
  {
    files: ["**/*.mjs", "**/*.js"],
    plugins: { security },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      ...security.configs.recommended.rules,
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];
