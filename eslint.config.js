import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        // Настройки для React
        plugins: {
            react: pluginReact,
        },
        settings: {
            react: {
                version: "detect", // Автоматически определяет версию React
            },
        },
        rules: {
            // Отключаем требование импорта React
            "react/react-in-jsx-scope": "off",
            // Добавляем другие правила при необходимости
        },
        // Для TypeScript+JSX
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },
];