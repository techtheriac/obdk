<template>
  <div class="rumination-index">
    <TagsFilter :tags="tags" />

    <div class="section__container">
      <section class="section">
        <ol>
          <li class="year-segment" v-for="(item, index) in groupedByYearSorted">
            <h2>{{ `'${item[0]}` }}</h2>
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
      <section class="section poetry">
        <div class="section-aside">
          <NuxtLink to="/www">Essays & Catalog Index <span>→</span> </NuxtLink>
          <NuxtLink to="/essays"
            >Read my poetry collection <span>→</span>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { Essay } from "~/obdk";

const local = await queryContent("essays").find();
const { data: notion } = await useFetch("/api/get-notion-posts");

let articles = useTextContent(local, notion);

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

function yearSort(a, b) {
  return b[0] - a[0];
}

const groupedByYear = groupListingByYear(articles);
const groupedByYearSorted = Object.entries(groupedByYear).sort(yearSort);
const articlesTags = articles.flatMap((x) => x.tags);
let tags = new Set(articlesTags);
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

.section-aside {
  display: flex;
  flex-direction: column;
  padding: var(--space-xs);
  border: 0.5px solid var(--border-color);
  border-radius: 0.5em;
  gap: var(--space-xs);

  > a {
    color: var(--foreground-100);
    padding: var(--space-xs);
    background-color: var(--background-200);
    border-radius: 0.4em;
  }
}
.year-segment {
  h2 {
    font-variation-settings:
      "slnt" 0,
      "MONO" 0;
    font-size: var(--step-1);
    font-weight: 450;
    padding-top: var(--space-xs);
  }
}
.section__container {
  width: 100%;
  display: grid;
  gap: var(--space-xs);
  grid-template-columns: 1fr;
}

@media screen and (min-width: 700px) {
  .section__container {
    --padding-inline: 15vmin;
    grid-template-columns: 4fr 1fr;
  }
  .section-aside {
    margin-top: 7vmin;
    position: sticky;
    top: 18vmin;
  }
}

.article-listing {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 50ch), 1fr));
  grid-column-gap: var(--space-s);
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
