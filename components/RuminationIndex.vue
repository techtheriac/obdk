<template>
  <div class="flow-hr">
    <TagsFilter :tags="tags" />

    <section>
      <ol class="section article-list">
        <li
          class="title"
          v-for="articleItem in yearSorting"
          :data-tags="articleItem.tagsString"
          data-tag-show="true"
        >
          <div class="date">
            <span>{{ articleItem.day }}</span>
            <span>
              {{ articleItem.month }}
            </span>
            <span>
              {{ articleItem.year }}
            </span>
          </div>
          <NuxtLink :to="articleItem?.slug">{{ articleItem.title }}</NuxtLink>
          <p class="summary" v-if="articleItem.summary">
            {{ articleItem.summary }}
          </p>
        </li>
      </ol>
    </section>
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
console.log("Year", yearSorting);
</script>

<style scoped lang="scss">
.flow-hr {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.article-container {
  padding-inline: 5vw;
  width: 100%;
  border-radius: 5px;
  position: sticky;
  top: var(--space-xs);
  display: flex;
  justify-content: space-between;
}

.article-description {
  display: h1 {
    font-family: Grosteque;
    font-size: 6.5vmin;
  }
}

.section {
  --h2: var(--idealListingFontSize);
  h2 {
    font-family: "Grosteque";
    font-weight: 400;
    font-size: var(--h2);
  }
}

section {
  padding-block-start: var(--space-s);
  max-width: 1080px;
  margin-inline: auto;
}

.article-list {
  width: 100%;
  display: grid;
  row-gap: var(--space-s);
  grid-template-columns: 1fr;
}

@media screen and (min-width: 600px) {
  .article-list {
    display: grid;
    gap: var(--space-s);
    grid-template-columns: repeat(3, 1fr);
  }

  .title:has(.summary) {
    grid-column: span 2;
  }
}

.title {
  font-weight: 400;
  z-index: 2;
  position: relative;
  text-wrap: balance;
  font-family: "Blanco";
  font-size: var(--idealArticleListingFontSize);
  color: var(--foreground-100);
  display: flex;
  flex-direction: column;
  align-items: baseline;

  .date {
    display: flex;
    gap: 2px;
    font-family: "TWK Lausanne";
    font-size: var(--step--2);
    text-transform: uppercase;
  }

  a {
    font-size: var(--step-1);
    padding-inline-start: var(--space-xs);
    text-decoration: underline;
    text-decoration-color: var(--border-color);
    text-underline-offset: 0.09em;
    text-decoration-thickness: 0.5px;
    padding-block: 0.3em;
    transition:
      color 0.45s var(--easingOut),
      text-shadow 1s var(--easingOut);
    &:hover {
      color: var(--foreground-200);
    }
  }

  .summary {
    transition:
      color 0.45s var(--easingOut),
      text-shadow 1s var(--easingOut);
    font-weight: 400;
    font-style: italic;
    font-size: var(--step-0);
    line-height: 1.3em;
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
