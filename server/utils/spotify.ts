import axios from "axios";
import { Buffer } from "buffer";
import { buildPaletteSync, utils } from "image-q";
import queryString from "query-string";
import {
  AccessTokenResponse,
  MusicIntegration,
  NowPlaying,
  SpotifyConfig,
} from "~/obdk";

export class Spotify implements MusicIntegration {
  readonly ConfigOptions: SpotifyConfig;
  constructor(configOptions: SpotifyConfig) {
    this.ConfigOptions = configOptions;
  }

  async extractColorPaletteFromImage(
    source: `https://${string}`
  ): Promise<any> {
    const response = await axios.get(source, {
      responseType: "arraybuffer",
    });

    const image = Buffer.from(response.data, "base64");

    const pointContainer = utils.PointContainer.fromBuffer(image, 64, 64);

    const palette = buildPaletteSync([pointContainer], {
      colorDistanceFormula: "cie94-graphic-arts",
      paletteQuantization: "wuquant",
      colors: 15,
    });

    return palette;
  }

  async getAccessToken(): Promise<AccessTokenResponse> {
    const { authBase, clientId, clientSecret, refreshToken } =
      this.ConfigOptions;

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
  }

  async getNowPlaying(): Promise<NowPlaying> {
    const { authBase, clientId, clientSecret, refreshToken, base } =
      this.ConfigOptions;

    const { access_token } = await this.getAccessToken();

    const response = await fetch(`${base}/me/player/recently-played?limit=1`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { items } = await response.json();

    const palette = await this.extractColorPaletteFromImage(
      items[0].track.album.images[0].url
    );

    // console.log(
    //   "🚀 ~ file: spotify.ts:98 ~ Spotify ~ getNowPlaying ~ palette:",
    //   palette
    // );

    const colorStringValues = palette._pointArray.map(
      (color) => `rgba(${color.r},${color.g},${color.b}, 0.9)`
    );

    // console.log(
    //   "🚀 ~ file: spotify.ts:104 ~ Spotify ~ getNowPlaying ~ colorStringValue:",
    //   colorStringValues
    // );

    return {
      url: items[0].track.external_urls.spotify,
      songTitle: items[0].track.name,
      artist: items[0].track.artists[0].name,
      previewUrl: items[0].track.preview_url,
      palette: colorStringValues,
    };
  }
}
