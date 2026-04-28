import js from '@eslint/js';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
	globalIgnores(['dist']),
	{
		files: ['**/*.{js,jsx}'],
		extends: [
			js.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		rules: {
			'no-unused-vars': 'off',
		},
	},
	{
		files: ['**/*.{ts,tsx}'],
		plugins: {
			'@typescript-eslint': tseslintPlugin,
		},

		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parser: parser,
			parserOptions: {
				project: './tsconfig.json',
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		rules: {
			...tseslintPlugin.configs.recommended.rules,
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_[a-zA-Z]' }],
		},
	},
]);
