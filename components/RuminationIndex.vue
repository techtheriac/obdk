<template>
  <div class="flow-hr">
    <h1 class="section-title">artefacts</h1>
    <TagsFilter :tags="tags" />

    <ol class="section article-list">
      <li
        class="title"
        v-for="articleItem in yearSorting"
        :data-tags="articleItem.tagsString"
        data-tag-show="true"
      >
        <NuxtLink :to="articleItem?.slug">{{ articleItem.title }}</NuxtLink>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { Essay } from "~/obdk";

const musings = await queryContent("essays").find();
const { data: notion } = await useFetch("/api/get-notion-posts");

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

function groupListingByYear(essays: Essay[]): Record<string, Essay[]> {
  const distinctYears = getDistinctYear(essays);

  let yearMap: Record<Number, Essay[]> | {} = {};

  distinctYears.forEach((year) => {
    yearMap[parseInt(year)] = essays.filter((post) => post.year === year);
  });

  return yearMap;
}

function sortByYear(essays: Essay[]): Essay[] {
  return essays.sort((a, b) => parseInt(b.year) - parseInt(a.year));
}

const essays: Essay[] = musings.map((post) => {
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

let articles = [...essays, ...notes];
const articlesTags = articles.flatMap((x) => x.tags);
let tags = new Set(articlesTags);
const yearSorting = sortByYear(articles);
</script>

<style scoped lang="scss">
.flow-hr {
  display: flex;
  flex-direction: column;
}

.section {
  --h2: var(--idealListingFontSize);
  h2 {
    font-family: "Grosteque";
    font-weight: 400;
    font-size: var(--h2);
  }
}

.article-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  // align-items: center;
  padding-top: var(--space-xs);
}

.section-title {
  font-size: var(--step--1);
  align-self: center;
  text-transform: uppercase;
  border: 1px solid var(--border-color);
  border-bottom: none;
  padding: var(--space-s) var(--space-s);
  font-variation-settings: "MONO" 1;
}

.title {
  --font-size: var(--step-0);
  font-weight: var(--article-body-weight);
  z-index: 2;
  text-wrap: balance;
  color: var(--foreground-100);
  padding-block: 0.25em;
  font-size: var(--font-size);

  a {
    font-size: inherit;
    text-decoration: underline;
    text-decoration-color: var(--border-color);
    text-underline-offset: 0.09em;
    text-decoration-thickness: 0.5px;
    padding-block: 0.3em;
    hyphens: auto;
    transition:
      color 0.45s var(--easingOut),
      text-shadow 1s var(--easingOut);
    &:hover {
      color: var(--foreground-200);
    }
  }
}

@media screen and (min-width: 600px) {
  .article-list {
    flex-direction: column;
    // justify-content: center;
  }

  .title {
    --font-size: var(--step-0);
  }
  .title:not(:last-child) > a::after {
    // content: "°";
    // padding-inline: 0.3em;
    // font-weight: inherit;
  }
}

[data-tag-show="true"] {
  a {
    color: var(--foreground-100);
  }

  .summary {
    color: var(--foreground-100);
  }
}
[data-tag-show="false"] {
  a {
    color: transparent;
    text-shadow: 0 0 4px var(--foreground-100);
  }
  .summary {
    color: transparent;
    text-shadow: 0 0 4px var(--foreground-100);
  }
}
</style>
