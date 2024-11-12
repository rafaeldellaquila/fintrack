// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
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
    'import/no-duplicates': 'error',
    'import/first': 'error',
    'import/order': 'error'
  }
});
