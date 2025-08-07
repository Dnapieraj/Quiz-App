import globals from 'globals'
import { defineConfig } from 'eslint/config'
import reactPlugin from 'eslint-plugin-react'

export default defineConfig([
	{
		files: ['**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 'latest', // zmiana z 2021 na 'latest'
			sourceType: 'module',
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
				...globals.es2021,
				...globals.node,
			},
		},
		plugins: {
			react: reactPlugin,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			semi: ['off'],
			quotes: ['off'],
			'no-const-assign': ['error'],
			'no-unused-vars': [
				'warn',
				{
					ignoreRestSiblings: true,
					argsIgnorePattern: '^_',
				},
			],
			camelcase: ['error', { properties: 'never' }],
			'no-console': ['warn'],
			'react/prop-types': ['off'],
		},
	},
])
