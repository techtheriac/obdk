import { HarmonizedArticle } from "~/obdk";

export default function usePreviousNext(
  slug: string,
  contents: HarmonizedArticle[],
) {
  let currentIndex = 0;

  for (const content of contents) {
    if (content.slug.includes(slug)) {
      currentIndex = contents.indexOf(content);
    }
  }

  if (currentIndex == contents.length - 1) {
    return {
      next: contents[1],
      previous: contents[0],
    };
  }

  if (currentIndex == 0) {
    return {
      next: contents[1],
      previous: contents[contents.length - 1],
    };
  }

  return {
    next: contents[currentIndex + 1],
    previous: contents[currentIndex - 1],
  };
}
