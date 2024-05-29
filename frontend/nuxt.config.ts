// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', "vuetify-nuxt-module"],
  vuetify: {
	moduleOptions: {
	  /* module specific options */
	},
	vuetifyOptions: {
	  /* vuetify options */
	  theme: {
		defaultTheme: 'dark'
	 }
	}
 },
 css: ['~/assets/styles/global.scss']
})