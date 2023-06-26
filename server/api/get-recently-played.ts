import { getNowPlaying, SpotifyConfig } from "~/infrastructure/Spotify";

const config: SpotifyConfig = {
  authBase: process.env.SPOTIFY_AUTH_BASE,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
  base: process.env.SPOTIFY_BASE,
};

export default defineEventHandler(async (event) => {
  const res = await getNowPlaying(config);
  return {
    ...res,
  };
});
