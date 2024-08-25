import pluginJs from "@eslint/js"
import typescriptEslintParser from "@typescript-eslint/parser"
import astroEslintParser from "astro-eslint-parser"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginAstro from "eslint-plugin-astro"
import jsxA11y from "eslint-plugin-jsx-a11y"
import globals from "globals"
import tseslint from "typescript-eslint"

export default [
	{ files: ["**/*.{astro,js,mjs,cjs,ts,tsx}"] },
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser,
			},
			parser: typescriptEslintParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
			},
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	jsxA11y.flatConfigs.recommended,
	...eslintPluginAstro.configs.recommended,
	{
		rules: {
			"eol-last": "off",
			"jsx-quotes": ["warn", "prefer-double"],
			"quotes": ["warn", "double"],
			"semi": ["warn", "never"],
			"no-constant-binary-expression": "warn",
			"no-debugger": "warn",
			"no-extend-native": "off",
			"no-trailing-spaces": "warn",
			"space-before-function-paren": "off",
			"n/prefer-global/process": "off",
			"no-unused-vars": "warn",
			"@typescript-eslint/no-unused-vars": "off",
			"object-curly-newline": [
				"warn",
				{
					consistent: true,
					multiline: true,
				},
			],
			"object-curly-spacing": ["warn", "always"],
			"array-element-newline": ["warn", "consistent"],
			"array-bracket-newline": ["warn", "consistent"],
		},
	},
	{
		ignores: [
			"/node_modules/**",
			"dist/**",
			"build/**",
			"public/**",
			"out/**",
			"coverage/**",
			"docs",
			".vercel/",
			"src/env.d.ts",
			"tailwind.config.js",
		],
	},
	{
		files: ["*.astro"],
		parser: astroEslintParser,
		parserOptions: {
			parser: typescriptEslintParser,
			extraFileExtensions: [".astro"],
		},
		rules: {
			"astro/no-conflict-set-directives": "warn",
			"astro/no-unused-define-vars-in-style": "warn",
			"astro/no-unused-css-selector": "off",
			"astro/prefer-class-list-directive": "warn",
			"astro/semi": ["warn", "never"],
			"astro/jsx-a11y/anchor-is-valid": "warn",
		},
	},
	{
		// Define the configuration for `<script>` tag.
		// Script in `<script>` is assigned a virtual file name with the `.js` extension.
		files: ["**/*.astro/*.js", "*.astro/*.js"],
		parser: typescriptEslintParser,
	},
	eslintConfigPrettier,
]
