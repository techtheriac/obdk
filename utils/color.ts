import { type Genre } from "~/obdk";

const colorMap = {
  musing: "hsla(24deg 100% 50% / 30%)",
  engineering: "#FF9200",
  poetry: "#87A19E",
};

export function getColorFromGenre(genre: Genre | string): string {
  return colorMap[genre];
}
