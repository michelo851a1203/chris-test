// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/chris-test/' : '/',
    buildAssetsDir: '/static/'
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@unocss/nuxt'],
  css: ['@unocss/reset/tailwind-compat.css']
})
