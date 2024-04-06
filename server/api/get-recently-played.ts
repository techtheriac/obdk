import { type SpotifyConfig } from "~/obdk";
import { Spotify } from "../utils/spotify";

const config: SpotifyConfig = {
  authBase: process.env.SPOTIFY_AUTH_BASE,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
  base: process.env.SPOTIFY_BASE,
};

export default defineEventHandler(async (event) => {
  const SPOTIFY_INSTANCE = new Spotify(config);
  const res = await SPOTIFY_INSTANCE.getNowPlaying();
  return {
    ...res,
  };
});
