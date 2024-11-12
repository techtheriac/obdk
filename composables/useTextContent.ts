// @ts-nocheck
import { Essay } from "~/obdk";

function getTagsArrayFromNotion(document: any) {
  if (!document) return;
  const tagsArray = document?.properties?.tags?.multi_select.map((x) => x.name);
  const tagsString = tagsArray.join();
  return { tagsArray, tagsString };
}

function getTagsArrayFromMarkdown(document: string) {
  if (!document) return;
  const tagsArray = document.split(",");
  const tagsString = document;
  return { tagsArray, tagsString };
}

function getDistinctYear(essays: Essay[]): string[] {
  const years = essays.map((essay) => {
    return essay.year;
  });
  return years;
}

function yearSort(a, b) {
  return b[0] - a[0];
}

function groupListingByYear(essays: Essay[]): Record<string, Essay[]> {
  const distinctYears = getDistinctYear(essays);

  let yearMap: Record<Number, Essay[]> | {} = {};

  distinctYears.forEach((year) => {
    yearMap[parseInt(year)] = essays.filter((post) => post.year === year);
  });

  return yearMap;
}

export default function useTextContent(local: any[], notion: any[]) {
  const essays: Essay[] = local.map((post) => {
    let { day, month, year } = useDateTimeComponent(post.last_edited);
    const { tagsArray, tagsString } = getTagsArrayFromMarkdown(post.tags);
    return {
      day,
      month,
      year,
      title: post.title,
      slug: post._path,
      source: "local",
      stage: post.stage,
      genre: post.genre,
      tags: tagsArray,
      tagsString,
      segment: "ESSAYS",
      summary: post.summary,
    };
  });

  const notes: Essay[] = notion.value!.results.map((post) => {
    let { day, month, year } = useDateTimeComponent(post.last_edited_time);
    const { tagsArray, tagsString } = getTagsArrayFromNotion(post);
    return {
      day,
      month,
      year,
      title: post.properties.name.title[0].plain_text,
      slug: `/notes/${post.properties.slug.rich_text[0].plain_text}`,
      source: "notion",
      stage: post.properties.stage.status.name,
      genre: post.properties.tags.multi_select[0].name,
      tags: tagsArray,
      tagsString,
      segment: "NOTES",
    };
  });

  const articles = [...notes, ...essays];
  const groupedByYear = groupListingByYear(articles);
  const groupedByYearSorted = Object.entries(groupedByYear).sort(yearSort);
  const tags = new Set(articles.flatMap((x) => x.tags));

  return {
    tags,
    articles: groupedByYearSorted,
  };
}
