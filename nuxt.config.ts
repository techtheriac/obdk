export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
  },
  modules: ["@nuxt/content", "@pinia/nuxt"],
  css: ["@/assets/css/index.scss"],
  // Nuxt content: https://content.nuxtjs.org
  content: {},
  imports: {
    dirs: ["stores", "server"],
  },
});
