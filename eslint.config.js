// eslint.config.js (ESM)
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const jestGlobals = {
  // Jest globals
  jest: 'readonly',
  describe: 'readonly',
  it: 'readonly',
  test: 'readonly',
  expect: 'readonly',
  beforeEach: 'readonly',
  afterEach: 'readonly',
  beforeAll: 'readonly',
  afterAll: 'readonly',
  // common helpers sometimes used
  jestEach: 'readonly',
};

export default [
  js.configs.recommended,

  // Primary TS config
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['dist', 'node_modules', 'coverage'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      // if you need node globals like `process`/`__dirname`, add them here:
      // globals: { process: "readonly", __dirname: "readonly" }
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
    },

    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },

  // Test files — define jest globals via languageOptions.globals (flat config requires this)
  {
    files: [
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/*.test.js',
      '**/*.spec.js',
    ],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },

      // <-- correct way in flat-config: provide globals here, not "env"
      globals: jestGlobals,
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
    },

    rules: {
      // test-specific rule overrides (optional)
    },
  },
];
