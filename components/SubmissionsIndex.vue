<template>
  <div class="rumination-index">
    <h1 class="section-title">submissions on</h1>
    <TagsFilter :tags="tags" />

    <div class="section__container">
      <section class="section">
        <ol>
          <li class="year-segment" v-for="(item, index) in groupedByYearSorted">
            <h3>{{ item[0] }}</h3>
            <ol class="article-listing">
              <li
                class="article-item"
                v-for="articleItem in item[1]"
                :data-tags="articleItem.tagsString"
                data-tag-show="true"
              >
                <div class="published-date">
                  <span>{{ articleItem.day }}</span>
                  <span>{{ articleItem.month }}</span>
                </div>
                <div class="title">
                  <NuxtLink :to="articleItem?.slug">{{
                    articleItem.title
                  }}</NuxtLink>

                  <p class="summary" v-if="articleItem.summary">
                    {{ articleItem.summary }}
                  </p>
                </div>
              </li>
            </ol>
          </li>
        </ol>
      </section>
      <section class="section lab">
        <h1>Poetry</h1>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { Essay } from "~/obdk";

const musings = await queryContent("essays").find();
const { data: notion } = await useFetch("/api/get-notion-posts");

const labs = await queryContent("artefacts").where({ type: "lab" }).find();

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

function yearSort(a, b) {
  return b[0] - a[0];
}
const groupedByYear = groupListingByYear(articles);
const groupedByYearSorted = Object.entries(groupedByYear).sort(yearSort);

console.log("YEAR GROUPING SORTED", groupedByYearSorted);

const articlesTags = articles.flatMap((x) => x.tags);
let tags = new Set(articlesTags);
const yearSorting = sortByYear(articles);
</script>

<style scoped lang="scss">
.rumination-index {
  display: flex;
  flex-direction: column;
  margin-top: var(--space-s);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: var(--space-s);
  form {
    position: sticky;
    top: var(--space-s);
    z-index: 10;
  }
}

.section__container {
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
}

@media screen and (min-width: 600px) {
  .section__container {
    --padding-inline: 15vmin;
  }
}

.article-listing {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50ch, 1fr));
  grid-column-gap: var(--space-s);
}

.section-title {
  font-size: var(--step--1);
  align-self: center;
  text-transform: uppercase;
  border: 1px solid var(--border-color);
  border-bottom: none;
  border-top: none;
  padding: var(--space-s) var(--space-s);
  font-variation-settings: "MONO" 1;
}

.article-item {
  --font-size: var(--step-3);
  font-weight: var(--article-body-weight);
  z-index: 2;
  text-wrap: balance;
  color: var(--foreground-100);
  font-size: var(--font-size);
  display: flex;
  column-gap: var(--space-xs);
  align-items: center;
  padding: var(--space-xs) 0;
  border-bottom: 1px dashed var(--border-color);
  .published-date {
    font-size: var(--idealSubFontSize);
    color: var(--foreground-200);
    display: flex;
    flex-direction: column;
    background-color: var(--background-200);
    gap: min(var(--space-xs), 0.3em);
    padding: var(--space-xs);
    border-radius: 0.3em;
  }

  a {
    font-size: var(--step-0);
    font-weight: 400;
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

  .summary {
    font-size: var(--step--1);
    padding-block-start: 0.3em;
  }
}

@media screen and (min-width: 600px) {
  .article-list {
    flex-direction: column;
    // justify-content: center;
  }

  // .title {
  //   --font-size: var(--step-0);
  // }
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
