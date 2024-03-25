<template>
  <ul class="filter">
    <li
      role="button"
      v-for="(attribute, title) in aumentedAttributeMap"
      :data-augmented-ui="attribute"
    >
      <span>{{ title }}</span>
      <div class="container__btn_filter">
        <button class="btn_filter"></button>
        <button class="btn_filter"></button>
        <button class="btn_filter"></button>
      </div>
    </li>
  </ul>

  <ul>
    <li v-for="content in contents">
      <MusingItem
        :title="content.title"
        :path="content.slug"
        :publised="content.date"
        :stage="content.stage"
        genre="default"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
// @ts-nocheck
definePageMeta({
  layout: "article",
});

import { WRITING_GENRES } from "~/obdk";
type Filter = (typeof WRITING_GENRES)[number];
type AugmentedAttributedMap = Record<Filter, string>;

const aumentedAttributeMap: AugmentedAttributedMap = {
  musings: "tl-clip-x br-rect border",
  poetry: "tl-clip-x br-rect border",
  engineering: "tl-clip-x br-rect border",
};

const musings = await queryContent("essays").find();
const { data: notion } = await useFetch("/api/get-notion-posts");

const contents = computed(() => {
  const essays: HarmonizedArticle[] = musings.map((post) => {
    return {
      date: post.last_edited,
      title: post.title,
      slug: post._path,
      source: "local",
      stage: post.stage,
    };
  });

  const notes: HarmonizedArticle[] = notion.value!.results.map((post) => {
    return {
      date: post.last_edited_time,
      title: post.properties.name.title[0].plain_text,
      slug: `notes/${post.properties.slug.rich_text[0].plain_text}`,
      source: "notion",
      stage: post.properties.stage.status.name,
    };
  });

  return [...essays, ...notes];
});
</script>

<style scoped>
.filter {
  display: flex;

  li + li {
    margin-left: var(--space-xs);
  }

  li {
    text-transform: uppercase;
    padding: var(--space-s) var(--space);
    --aug-border-all: 1px;
    --aug-border-bg: #2e2e2e;
    --aug-tl: 0.5em;
    --aug-br: 0.5em;
    display: grid;
    grid-template-areas: "stack";

    &:hover {
      cursor: pointer;
    }

    .container__btn_filter {
      grid-area: stack;
      z-index: 2;

      display: flex;
      width: 100%;
      justify-content: space-between;

      .btn_filter {
        background-color: #87a19e87;
        cursor: pointer;
        border: 1px solid #87a19e;
        width: 0.3rem;
        height: 2em;
      }
    }

    span {
      grid-area: stack;
      z-index: 0;
    }
  }
}
</style>