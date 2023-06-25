import { Buffer } from "buffer";
import queryString from "query-string";

interface SpotifyConfig {
  authBase: string;
  base: string | undefined;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
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

// interface NowPlaying {
//   item: NowPlayingItem;
//   album: Album;
// }
// IDEAL STEPS
// Construct browswer url to get code
// supply code as a value to code key in `w-xxx-form-urlencoded` for call to get token
// access token and refresh token is returned
// keep refresh token
// it'll be used to get access token for subsequent calls
// access token is supplied as Authorization header in form   `Beaerer ${token}`

// Create a mechanism to get referesh token

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

  const response = await fetch(`${config.base}/me/player/currently-playing`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const { item } = await response.json();

  console.log("Nowplaying item", item);

  return {
    url: item.href,
    songTitle: item.name,
    artist: item.artists[0].name,
  };
};

export { getAccessToken, getNowPlaying, SpotifyConfig, NowPlaying };
