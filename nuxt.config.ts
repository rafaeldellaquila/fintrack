// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxtjs/supabase', '@nuxtjs/tailwindcss'],
	devtools: { enabled: true },
	future: {
		compatibilityVersion: 4,
	},
	compatibilityDate: '2024-04-03',
	supabase: {
		redirect: false
	},
	css: ['../app/assets/tailwind.css'],
	postcss: {
		plugins: {
			'tailwindcss': {},
			'autoprefixer': {},
			'postcss-import': {},
			'tailwindcss/nesting': {},
		}
	},

});
