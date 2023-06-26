import { Buffer } from "buffer";
import queryString from "query-string";

interface SpotifyConfig {
  authBase: string | undefined;
  base: string | undefined;
  clientId: string | undefined;
  clientSecret: string | undefined;
  refreshToken: string | undefined;
}

interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface Album {
  images: Image[];
}
interface Image {
  url: string;
  height: number;
  width: number;
}

interface NowPlayingItem {
  href: string;
  name: string;
}

interface NowPlaying {
  artist: string;
  songTitle: string;
  url: string;
}

const getAccessToken = async ({
  authBase,
  clientId,
  clientSecret,
  refreshToken,
}: SpotifyConfig): Promise<AccessTokenResponse> => {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const payload = queryString.stringify({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await fetch(`${authBase}/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  });

  return response.json();
};

const getNowPlaying = async (config: SpotifyConfig): Promise<NowPlaying> => {
  const { access_token } = await getAccessToken(config);

  const response = await fetch(
    `${config.base}/me/player/recently-played?limit=1`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const { items } = await response.json();

  return {
    url: items[0].track.external_urls.spotify,
    songTitle: items[0].track.name,
    artist: items[0].track.artists[0].name,
  };
};

export { getAccessToken, getNowPlaying, SpotifyConfig, NowPlaying };
