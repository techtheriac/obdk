import { Buffer } from "buffer";
import queryString from "query-string";
import axios from "axios";
import { buildPalette, distance, palette, utils } from "image-q";
import {
  AccessTokenResponse,
  SpotifyConfig,
  SpotifyIntegration,
  NowPlaying,
} from "~/obdk";

export class Spotify implements SpotifyIntegration {
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

    var targetColors = 256;

    // create chosen distance calculator (see classes inherited from `iq.distance.AbstractDistanceCalculator`)
    var distanceCalculator = new distance.Euclidean();

    // create chosen palette quantizer (see classes implementing `iq.palette.AbstractPaletteQuantizer`)
    var paletteQuantizer: any = new palette.RGBQuant(
      distanceCalculator,
      targetColors
    );

    // feed out pointContainer filled with image to paletteQuantizer
    paletteQuantizer.sample(pointContainer);

    // take generated palette
    var colors = paletteQuantizer.quantizeSync();

    console.log(colors);

    return colors;
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

    return {
      url: items[0].track.external_urls.spotify,
      songTitle: items[0].track.name,
      artist: items[0].track.artists[0].name,
      previewUrl: items[0].track.preview_url,
    };
  }
}
