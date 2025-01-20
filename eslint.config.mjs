// @ts-check
import stylistic from '@stylistic/eslint-plugin';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
	files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
	plugins: {
		'@stylistic': stylistic
	},
	rules: {
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/no-duplicate-enum-values': 'error',
		'@typescript-eslint/no-empty-object-type': 'error',
		'@typescript-eslint/no-extra-non-null-assertion': 'error',
		'@typescript-eslint/no-this-alias': 'error',
		'@typescript-eslint/no-unnecessary-type-constraint': 'error',
		'@typescript-eslint/no-unused-expressions': 'warn',
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/prefer-as-const': 'error',
		'vue/attribute-hyphenation': 'error',
		'vue/attributes-order': 'error',
		'vue/block-order': 'error',
		'vue/html-self-closing': 'error',
		'vue/no-multiple-template-root': 'off',
		'vue/multi-word-component-names': 'off',
		'vue/require-default-prop': 'off',
		'import/no-duplicates': 'error',
		'import/first': 'error',
		'import/order': 'error',
		'@/max-len': ['warn', { code: 120 }],
    '@/indent': ['warn', 2],
    '@/semi': ['warn', 'never'],
    '@/quotes': ['warn', 'single'],
    '@/quote-props': ['warn', 'as-needed'],
    '@/arrow-parens': ['warn', 'always'],
    '@/block-spacing': ['warn', 'always'],
    '@/brace-style': ['warn', '1tbs'],
    '@/comma-dangle': ['warn', 'never'],
	}
});
