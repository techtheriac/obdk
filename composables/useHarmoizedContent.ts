// @ts-nocheck
import { HarmonizedArticle } from "~/obdk";

export default async function useHarmonizedContent() {
  const musings = await queryContent("essays").find();
  const { data: notion } = await useFetch("/api/get-notion-posts");

  const essays: HarmonizedArticle[] = musings.map((post) => {
    return {
      date: post.last_edited,
      title: post.title,
      slug: post._path,
      source: "local",
      stage: post.stage,
      genre: post.genre,
    };
  });

  const notes: HarmonizedArticle[] = notion.value!.results.map((post) => {
    return {
      date: post.last_edited_time,
      title: post.properties.name.title[0].plain_text,
      slug: `notes/${post.properties.slug.rich_text[0].plain_text}`,
      source: "notion",
      stage: post.properties.stage.status.name,
      genre: post.properties.tags.multi_select[0].name,
    };
  });

  return [...essays, ...notes];
}
