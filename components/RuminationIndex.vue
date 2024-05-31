<template>
  <div class="flow-hr">
    <TagsFilter :tags="tags" />
    <section class="article-container">
      <div class="article-section">
        <ol class="article-main section">
          <h2>Writing</h2>
          <li class="year-segment" v-for="(item, index) in groupedByYear">
            <h3>{{ item[0] }}</h3>
            <ol class="article-listing">
              <li
                class="title"
                v-for="articleItem in item[1]"
                :data-tags="articleItem.tagsString"
                data-tag-show="true"
              >
                <NuxtLink :to="articleItem?.slug">{{
                  articleItem.title
                }}</NuxtLink>

                <p class="summary" v-if="articleItem.summary">
                  {{ articleItem.summary }}
                </p>
              </li>
            </ol>
          </li>
        </ol>

        <hr class="divide" />

        <div class="section lab">
          <h2>Lab</h2>
          <ol>
            <li>One of the notes</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing</li>
            <li>Lorem, ipsum dolor sit amet consectetur adipisicing.</li>
            <li>Lorem, ipsum dolor sit amet consectetur adipisicing.</li>
          </ol>
        </div>
      </div>
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

const _groupedByYear = groupListingByYear(articles);

function compareValues(a, b) {
  return b[0] - a[0];
}

const groupedByYear = Object.entries(_groupedByYear).sort(compareValues);
</script>

<style scoped lang="scss">
.flow-hr {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  // > * + * {
  //   margin-top: var(--space-s);
  // }
}

.article-container {
  width: 100%;
  border-radius: 5px;
  background-color: var(--elevated);
  position: sticky;
  top: var(--space-xs);
}

.article-section {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-areas:
    "essays"
    "divide"
    "lab";
  grid-template-columns: 1fr;
  gap: var(--space-s);
}

.divide {
  grid-area: divide;
  width: 100%;
  border-top: 1px solid var(--border-color);
}

@media screen and (min-width: 600px) {
  .article-section {
    grid-template-areas: "essays divide lab";
    grid-template-columns: 1fr 0.5px 1fr;
  }

  .divide {
    grid-area: divide;
    border-left: 1px solid var(--border-color);
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

.section:nth-child(1) {
  grid-area: essays;
}

.lab {
  display: flex;
  flex-direction: column;
}

.section:nth-child(2) {
  grid-area: lab;
}

.section:nth-child(3) {
  display: flex;
}

.article-main {
  grid-area: essays;
  > * + * {
    margin-top: var(--space);
  }

  .year-segment {
    display: flex;
    gap: var(--space-s);
  }

  .article-listing {
    > * + * {
      margin-top: var(--space-s);
    }
  }

  h2 {
    grid-area: title;
  }

  ol {
    grid-area: listing;
  }
}

.title {
  font-weight: 400;
  z-index: 2;
  position: relative;
  text-wrap: balance;
  font-family: "Blanco";

  a {
    text-decoration: underline;
    text-decoration-color: var(--border-color);
    text-underline-offset: 0.09em;
    text-decoration-thickness: 0.5px;
    transition:
      color 0.45s var(--easingOut),
      text-shadow 1s var(--easingOut);
    color: var(--foreground-100);
    &:hover {
      color: var(--foreground-200);
    }
  }

  .summary {
    font-style: italic;
    transition:
      color 0.45s var(--easingOut),
      text-shadow 1s var(--easingOut);
    font-weight: 400;
    font-size: var(--idealArticleParagraphSize);
    padding-top: 0.4em;
    line-height: 1.3em;
  }
}

[data-tag-show="true"] {
  a {
    color: var(--foreground-100);
  }

  .summary {
    color: var(--foreground-200);
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
