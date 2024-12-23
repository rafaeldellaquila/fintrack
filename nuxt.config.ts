// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxtjs/supabase', '@nuxtjs/tailwindcss'],
	devtools: { enabled: true },
	future: {
		compatibilityVersion: 4,
	},
	compatibilityDate: '2024-04-03',
	postcss: {
		plugins: {
			'postcss-import': {},
			'tailwindcss/nesting': {},
			'tailwindcss': {},
			'autoprefixer': {},
		}
	},
	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
				arrowParens: true,
				quotes: 'single',
				quoteProps: 'consistent-as-needed',
				commaDangle: 'only-multiline',
			}
		}
	},
	supabase: {
		redirect: false
	},
});
