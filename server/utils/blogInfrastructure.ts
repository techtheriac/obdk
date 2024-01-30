export const STAGES = ["seed", "bud", "fruit"] as const;
export type Stage = (typeof STAGES)[number];
export type Source = "notion" | "local";

export interface HarmonizedArticle {
  date: string;
  title: string;
  slug: string;
  source: Source;
  stage: Stage | string;
}

export function useHarmoziedContent(
  localPosts: any,
  notionPosts: any,
): HarmonizedArticle[] {
  console.log("LOCAL", localPosts);
  const local: HarmonizedArticle[] = localPosts.map((post) => {
    return {
      date: post.last_edited,
      title: post.title,
      slug: post._path,
      source: "local",
      stage: post.stage,
    };
  });

  const notion: HarmonizedArticle[] = notionPosts.results.map((post) => {
    return {
      date: post.last_edited_time,
      title: post.properties.name.title[0].plain_text,
      slug: `notes/${post.properties.slug.rich_text[0].plain_text}`,
      source: "notion",
      stage: post.properties.stage.status.name,
    };
  });

  return [...local, ...notion];
}
