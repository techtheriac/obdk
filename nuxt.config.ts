export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
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
