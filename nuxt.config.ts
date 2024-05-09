export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Jezreel Franklin | Software Engineer",
      htmlAttrs: {
        lang: "en",
      },
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
  routeRules: {
    "/": { isr: 60 },
    "/essays": { swr: true },
    "/essays/**": {
      swr: 3600,
      prerender: true,
    },
    "/notes/**": { swr: 3600, prerender: true },
  },
});
