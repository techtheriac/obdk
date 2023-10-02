import { describe, expect, test } from "@jest/globals";
import {
  ColorMind,
  ImageQ,
  PointProvider,
} from "../server/utils/colorProvider";

describe("module to extract RGB points from remote image", () => {
  const IMAGEURL =
    "https://i.scdn.co/image/ab67616d0000b273194fbf171c73fdb1413ff7a7";
  test("Returns an array of pixel points", async () => {
    const SUT = new PointProvider(IMAGEURL);
    const points = await SUT.extractPointsFromImage();
    expect(points).toBeDefined();
  });

  test("Returns a flat array of RGB channels from color mind", async () => {
    const SUT = new ColorMind(IMAGEURL);
    const colors = await SUT.extractColorPaletteFromImage();
    expect(colors.length).toBeGreaterThanOrEqual(5);
  });

  test("Returns a flat array of RGB channels from ImageQ", async () => {
    const SUT = new ImageQ(IMAGEURL);
    const colors = await SUT.extractColorPaletteFromImage();
    expect(colors).toBeDefined();
  });
});
