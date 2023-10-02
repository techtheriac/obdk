import axios from "axios";
import { distance, palette, utils } from "image-q";
import { Url } from "~/obdk";
import { randomFromArray } from ".";
const { RGBQuant } = palette;
export type Color = `rgb${string}`;

export interface PointProvier {
  extractPointsFromImage(): Promise<utils.PointContainer>;
}

export class PointProvider implements PointProvier {
  imageSourceUrl?: Url;
  /**
   * constructs instance with remote image url from which pixels are extracted
   */
  constructor(source: Url) {
    this.imageSourceUrl = source;
  }

  async extractPointsFromImage(): Promise<utils.PointContainer> {
    const response = await axios.get(this.imageSourceUrl as string, {
      responseType: "arraybuffer",
    });

    const imageBuffer = Buffer.from(response.data, "base64");

    return utils.PointContainer.fromBuffer(imageBuffer, 64, 64);
  }
}

export interface ColorProvider {
  extractColorPaletteFromImage(): Promise<Color[]>;
}

export class ColorMind extends PointProvider implements ColorProvider {
  /**
   * Specified image url from which colors are extracted
   */
  constructor(source: Url) {
    super(source);
  }

  async extractColorPaletteFromImage(): Promise<Color[]> {
    const pointArray = (await this.extractPointsFromImage())
      .getPointArray()
      .map((x) => [x.rgba[0], x.rgba[1], x.rgba[2]]);

    const algosReq = await fetch("http://colormind.io/list/");
    const algosRes = await algosReq.json();

    const algo = randomFromArray(algosRes.result);

    const data = {
      model: algo,
      input: pointArray,
    };

    const colorMindResponse = await fetch("http://colormind.io/api/", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const res = await colorMindResponse.json();

    const colorArray = res.result;

    return colorArray.map(
      (color) => `rgb(${color[0]},${color[1]},${color[2]})`
    );
  }
}

export class ImageQ extends PointProvider implements ColorProvider {
  constructor(source: Url) {
    super(source);
  }

  async extractColorPaletteFromImage(): Promise<Color[]> {
    const pointContainer = await this.extractPointsFromImage();

    const distanceCalculator = new distance.CIEDE2000();

    const paletteQuantizer = new RGBQuant(distanceCalculator, 128);

    paletteQuantizer.sample(pointContainer);

    const palette = paletteQuantizer.quantizeSync();

    const result = JSON.parse(JSON.stringify(palette));

    return result._pointContainer._pointArray.map(
      (x) => `rgb(${x.r},${x.g},${x.b})`
    );
  }
}
