import { type Genre } from "~/obdk";

const colorMap = {
  musings: "hsla(24deg 100% 50% / 30%)",
  engineering: "hsl(34.35deg 100% 50% / 44%)",
  poetry: "hsl(173.08deg 12.15% 58.04% / 50%)",
};

export function getColorFromGenre(genre: Genre | string): string {
  return colorMap[genre];
}
