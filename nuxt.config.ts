export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
  },
  modules: ["@nuxt/content"],
  css: ["@/assets/css/index.scss"],
  // Nuxt content: https://content.nuxtjs.org
  content: {},
});
