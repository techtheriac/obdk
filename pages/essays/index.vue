<template>
  <div>
    <form ref="tagSelect">
      <fieldset v-on:change="handleTag" class="tag-list">
        <div class="tag-toggle" v-for="tag in tags">
          <input type="checkbox" name="article-filter" :value="tag" :id="tag" />
          <label :style="galgoStyles" :for="tag">{{ tag }}</label>
        </div>
      </fieldset>
    </form>
    <div class="article-main flow">
      <EssaySegment
        name="Essays"
        summary="a timeline of the ceasless iterations my thoughts, findings & ideas undergo"
      >
        <ul class="essay_listing">
          <li
            class="musing__item"
            v-for="article in essays"
            :data-tags="article.tagsString"
            data-tag-show="true"
          >
            <h3 class="title">
              <NuxtLink :to="article?.slug">{{ article?.title }}</NuxtLink>
            </h3>
            <p class="summary">
              {{ article.summary }}
            </p>
          </li>
        </ul>
      </EssaySegment>
      <EssaySegment
        name="Notes"
        summary="A timelines of notes, anecdotes and brain farts–some of which are poised for becoming fully fledged essays."
      >
        <ul class="notes_listing">
          <li
            class="musing__item"
            v-for="article in notes"
            :data-tags="article.tagsString"
            data-tag-show="true"
          >
            <div class="published-date">
              <span>
                {{ article.day }}
              </span>
              <span>
                {{ article.month }}
              </span>
            </div>
            <h3 class="title">
              <NuxtLink :to="article?.slug">{{ article?.title }}</NuxtLink>
            </h3>
          </li>
        </ul>
      </EssaySegment>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
definePageMeta({
  layout: "article",
});
import { createStyleObject } from "@capsizecss/core";
import { Essay } from "~/obdk";

const galgoBase = reactive({
  capHeight: 43,
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
});

let init = createStyleObject(galgoBase);
let galgoStyles = ref(init);

onMounted(() => {
  window.addEventListener("resize", (event) => {
    let upperLimit = 100;
    let lowerLimit = 50;
    let idealWidth = event.target.innerWidth / 10;
    if (idealWidth < lowerLimit || idealWidth > upperLimit) return;
    galgoBase.capHeight = idealWidth;
  });
});

watch(galgoBase, () => {
  console.log("watching galgobase", galgoBase);
  galgoStyles.value = createStyleObject(galgoBase);
  console.log("watching galgoStyle", galgoStyles.value);
});

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

const essays: Essay[] = musings.map((post) => {
  let { day, month } = useDateTimeComponent(post.last_edited);
  const { tagsArray, tagsString } = galgoBasectTagsFromMarkdown(post.tags);
  return {
    day,
    month,
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
  let { day, month } = useDateTimeComponent(post.last_edited_time);
  const { tagsArray, tagsString } = galgoBasectTagsFromNotion(post);
  return {
    day,
    month,
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

let articles = [...notes, ...essays];

const notesTags = notes.flatMap((x) => x.tags);
const essaysTags = essays.flatMap((x) => x.tags);

let tags = new Set([...notesTags, ...essaysTags]);
</script>

<style scoped lang="scss">
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
        background: var(--background-200);
        border-radius: 2px;
        cursor: pointer;
        font-family: Galgo;
        text-transform: uppercase;
        font-size: 10vw;

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
.article-main {
  padding-top: 4vw;
  max-width: 1100px;
  margin-inline: auto;
  > * + * {
    margin-top: var(--space);
  }
}

.notes_listing {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30ch, 1fr));
  grid-row-gap: var(--space-xs);
  grid-column-gap: var(--space-s);

  li {
    display: flex;
    align-items: center;
    gap: var(--space-s);
  }
}

.musing__item {
  color: var(--foreground-100);
  padding: var(--space-s) 0;
  width: 100%;
  border-bottom: 1px solid var(--border-color);

  &__border-aug {
    --aug-border-all: 1px;
    --aug-border-bg: var(--border-bg);
    --aug-tl: 0px;
  }
}

.title {
  font-size: var(--idealArticleListingFontSize);
  font-weight: 500;
  z-index: 2;
  position: relative;
  text-wrap: balance;

  a {
    transition: color 0.45s var(--easing);
    color: var(--foreground-100);
    &:hover {
      color: var(--foreground-200);
    }
  }
}

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

.essay_listing {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  .summary {
    font-weight: 200;
    color: var(--foreground-200);
    margin-block-start: 0.5em;
  }
}

[data-tag-show="true"] .title {
  a,
  .summary {
    color: var(--foreground-100);
  }
}
[data-tag-show="false"] .title {
  a,
  .summary {
    color: var(--article-inactive);
  }
}
</style>
