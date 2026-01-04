import jsPlugin from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  jsPlugin.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    parser: '@typescript-eslint/parser',
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
    },
    rules: {
      // Не удаляем неиспользуемые импорты
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      // React правила
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
];
