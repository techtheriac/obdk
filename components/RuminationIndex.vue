<template>
  <div class="flow-hr">
    <form ref="tagSelect">
      <fieldset v-on:change="handleTag" class="tag-list">
        <div class="tag-toggle" v-for="tag in tags">
          <input type="checkbox" name="article-filter" :value="tag" :id="tag" />
          <label :style="galgoStyles" :for="tag">{{ tag }}</label>
        </div>
      </fieldset>
    </form>

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

        <div class="section">
          <h2>Lab</h2>
          <ol>
            <li>One of the notes</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing</li>
            <li>Lorem, ipsum dolor sit amet consectetur adipisicing.</li>
            <li>Lorem, ipsum dolor sit amet consectetur adipisicing.</li>
          </ol>
        </div>
      </div>
      <div class="section">
        <h2>gallery</h2>
        <ol>
          <li>One of the notes</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing</li>
          <li>Lorem, ipsum dolor sit amet consectetur adipisicing.</li>
          <li>Lorem, ipsum dolor sit amet consectetur adipisicing.</li>
        </ol>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck

import { createStyleObject } from "@capsizecss/core";
import { Essay } from "~/obdk";

function scale(
  value: number,
  min1: number,
  max1: number,
  min2: number,
  max2: number,
) {
  return min2 + ((value - min1) * (max2 - min2)) / (max1 - min1);
}

let galgoBase = ref({});
let galgoStyles = ref({});

function setIdealSizing(): number {
  if (!window) return;

  const idealUpperLimit = 100;
  const idealLowerLimit = 43;
  const winMinSize = 350;
  const winMaxSize = 1445;

  let winAbsWidth = window.innerWidth;

  let idealCapSize = Math.ceil(
    scale(
      winAbsWidth,
      winMinSize,
      winMaxSize,
      idealLowerLimit,
      idealUpperLimit,
    ),
  );

  galgoBase.value.capHeight = idealCapSize;

  return idealCapSize;
}

onBeforeMount(() => {
  let initialCapHeight = setIdealSizing();

  galgoBase.value = {
    capHeight: initialCapHeight,
    lineGap: 24,
    fontMetrics: {
      familyName: "Galgo Light",
      fullName: "Galgo Medium",
      postscriptName: "Galgo-Medium",
      capHeight: 613,
      ascent: 750,
      descent: -250,
      lineGap: 0,
      unitsPerEm: 1000,
      xHeight: 495,
      xWidthAvg: 178,
      subsets: {
        latin: {
          xWidthAvg: 178,
        },
        thai: {
          xWidthAvg: 120,
        },
      },
    },
  };

  galgoStyles.value = createStyleObject(galgoBase.value);
  window.addEventListener("resize", setIdealSizing);
});

// onMounted(() => {
// });

watch(
  () => galgoBase.value.capHeight,
  () => {
    galgoStyles.value = createStyleObject(galgoBase.value);
  },
);

const musings = await queryContent("essays").find();
const { data: notion } = await useFetch("/api/get-notion-posts");

let tagSelect = ref(null);

function handleTag(e) {
  let selected = new FormData(tagSelect.value).getAll("article-filter");
  let elements = document.querySelectorAll("[data-tags]");

  if (selected.length >= 1) {
    elements.forEach((element) => {
      let attrs = element.getAttribute("data-tags")?.split(",");
      if (thereExistCommonItems(attrs, selected)) {
        element.setAttribute("data-tag-show", true);
      } else {
        element.setAttribute("data-tag-show", false);
      }
    });
  } else {
    elements.forEach((element) => {
      element.setAttribute("data-tag-show", true);
    });
  }
}

function thereExistCommonItems(arr1, arr2) {
  return arr1.some((item) => arr2.includes(item));
}

function galgoBasectTagsFromNotion(document: any) {
  if (!document) return;
  const tagsArray = document?.properties?.tags?.multi_select.map((x) => x.name);
  const tagsString = tagsArray.join();
  return { tagsArray, tagsString };
}

function galgoBasectTagsFromMarkdown(document: string) {
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
  const { tagsArray, tagsString } = galgoBasectTagsFromMarkdown(post.tags);
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
  const { tagsArray, tagsString } = galgoBasectTagsFromNotion(post);
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

  > * + * {
    margin-top: var(--space-s);
  }
}
.pills__intro {
  max-width: 500px;
  margin-block-start: 4vmax;
  margin-inline: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-family: "Galgo";
    font-size: calc(var(--idealHeadingOne) + 6vw);
  }

  p {
    max-width: 50ch;
    line-height: 1.5em;
  }
}
form {
  margin-block-start: var(--space-s);
  position: sticky;
  top: var(--space-xs);
  z-index: 3;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -ms-scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
  .tag-list {
    padding: 0;
    border: none;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    white-space: nowrap;
    gap: var(--space-xs);

    > .tag-toggle {
      display: grid;
      box-shadow: var(--border-bg);

      > * {
        grid-area: 1/1;
      }

      > label {
        padding: 0.2em 0.1em;
        border: 1px solid var(--border-color);
        border-radius: 2px;
        cursor: pointer;
        font-family: Galgo;
        text-transform: uppercase;
        font-size: 4vw;

        &::before {
          content: "";
          margin-bottom: -0.0968em;
          display: table;
        }

        &:after {
          content: "";
          margin-top: -0.2097em;
          display: table;
        }
      }

      > input {
        appearance: none;
        background: none;
        border: none;
        inline-size: 100%;
        block-size: 100%;
        outline: none;

        &:checked ~ label {
          background-color: var(--accent-blue);
          color: var(--foreground-100);
        }

        &:not(:checked):is(:focus-within, :hover) ~ label {
          color: var(--foreground-100);
        }
      }
    }
  }
}

.article-container {
  // font-family: "LeituraNews";
  width: 100%;
  // background-color: var(--elevated);
  border-radius: 5px;
}

.article-section {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-areas:
    "essays lab"
    "gallery .";
  grid-template-columns: repeat(2, 1fr);
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

.section:nth-child(2) {
  grid-area: lab;
}

.section:nth-child(3) {
  grid-area: gallery;
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

.notes_listing {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30ch, 1fr));
  grid-row-gap: var(--space-s);
  grid-column-gap: var(--space-s);

  li {
    display: flex;
    align-items: center;
    gap: var(--space-s);
    position: relative;
    padding: var(--space-xs);

    --border: transparent;

    .title {
      font-size: var(--idealArticleParagraphSize);
      font-weight: 300;
    }

    &:hover {
      --border: var(--foreground-100);
      cursor: pointer;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: calc(var(--space-s) * -1);
      width: calc(var(--space-s));
      height: 1px;
      background-color: var(--border);
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: calc(var(--space-s) * -1);
      width: calc(var(--space-s) * 2);
      height: 1px;
      background-color: var(--border);
      z-index: 3;
      transform: rotate(90deg);
    }
  }
}

.title {
  font-weight: 400;
  z-index: 2;
  position: relative;
  text-wrap: balance;

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
