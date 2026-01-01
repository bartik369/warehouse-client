import pluginJs from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginImport.flatConfigs.recommended,
  {
    // Настройки для React
    plugins: {
      react: pluginReact,
      import: eslintPluginImport,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      // Сортировка импортов
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Встроенные модули Node.js (fs, path и т.д.)
            'external', // Внешние пакеты (react, lodash и т.д.)
            'internal', // Внутренние пути (алиасы)
            ['parent', 'sibling'], // ../ и ./
            'index', // index файлы
            'object', // Объектные импорты
            'type', // TypeScript типы
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react-**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          warnOnUnassignedImports: true,
        },
      ],

      // ОТКЛЮЧАЕМ удаление неиспользуемых импортов
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      // React правила
      'react/react-in-jsx-scope': 'off',

      // Дополнительно отключаем предупреждения о неиспользуемых импортах
      'import/no-unused-modules': 'off',
      'import/no-unresolved': 'off',
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];
