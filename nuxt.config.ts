export default defineNuxtConfig({
  modules: ["@nuxt/content"],
  css: ["@/assets/css/index.scss"],
  // Nuxt content: https://content.nuxtjs.org
  content: {},

  runtimeConfig: {
    public: {
      spotify: {
        base: process.env.SPOTIFY_BASE,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        clientId: process.env.SPOTIFY_CLIENT_ID,
        refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
        authBase: process.env.SPOTIFY_AUTH_BASE,
      },
    },
  },
});
