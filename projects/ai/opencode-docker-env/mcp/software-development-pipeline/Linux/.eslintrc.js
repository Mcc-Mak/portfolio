module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
    jest: true
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    babelOptions: {
      parserOpts: {
        plugins: ['jsx']
      }
    }
  },
  plugins: ['security', 'react'],
  extends: ['eslint:recommended', 'plugin:security/recommended'],
  ignorePatterns: ['node_modules/', 'coverage/', 'metrics/', 'logs/'],
  rules: {
    'no-console': 'off',
    'security/detect-non-literal-require': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-no-csrf-before-method-override': 'off',
    // Allowed intentionally: scripts/compliance-check.js builds regexes from
    // compliance.config.json (a reviewed local control list, not user input,
    // length-capped and compile-validated at load). detect-unsafe-regex stays on.
    'security/detect-non-literal-regexp': 'off'
  }
};
