<template>
  <ol>
    <li class="year-segment" v-for="(item, index) in articles">
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
            <NuxtLink :to="articleItem?.slug">{{ articleItem.title }}</NuxtLink>

            <p class="summary" v-if="articleItem.summary">
              {{ articleItem.summary }}
            </p>
          </div>
        </li>
      </ol>
    </li>
  </ol>
</template>
<script setup lang="ts">
import { Essay } from "~/obdk";
type ArticleListing = [string, Essay[]][];
const props = defineProps<{
  articles: ArticleListing;
}>();
</script>

<style scoped lang="scss">
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
