import jsPlugin from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  jsPlugin.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        console: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
];

// import jsPlugin from '@eslint/js';
// import tsPlugin from '@typescript-eslint/eslint-plugin';
// import tsParser from '@typescript-eslint/parser';
// import reactPlugin from 'eslint-plugin-react';

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   jsPlugin.configs.recommended,
//   {
//     files: ['**/*.{ts,tsx}'],
//     parser: '@typescript-eslint/parser',
//     languageOptions: {
//       parser: tsParser, // <- объект, а не строка
//       parserOptions: {
//         project: './tsconfig.json',
//       },
//     },
//     plugins: {
//       '@typescript-eslint': tsPlugin,
//       react: reactPlugin,
//     },
//     rules: {
//       // Не удаляем неиспользуемые импорты
//       'no-unused-vars': 'off',
//       '@typescript-eslint/no-unused-vars': 'off',
//       // React правила
//       'react/react-in-jsx-scope': 'off',
//     },
//     settings: {
//       react: { version: 'detect' },
//     },
//   },
// ];

// import jsPlugin from '@eslint/js';
// import tsPlugin from '@typescript-eslint/eslint-plugin';
// import tsParser from '@typescript-eslint/parser';
// import reactPlugin from 'eslint-plugin-react';

// /** @type {import("eslint").Linter.Config[]} */
// export default [
//   jsPlugin.configs.recommended,
//   {
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//       parser: tsParser, // <- объект, а не строка
//       parserOptions: {
//         project: './tsconfig.json',
//       },
//     },
//     plugins: {
//       '@typescript-eslint': tsPlugin,
//       react: reactPlugin,
//     },
//     rules: {
//       'no-console': 'off',
//       'no-unused-vars': 'off',
//       '@typescript-eslint/no-unused-vars': 'off',
//       'react/react-in-jsx-scope': 'off',
//     },
//     settings: {
//       react: { version: 'detect' },
//     },
//   },
// ];
