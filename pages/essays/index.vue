<template>
  <div class="content-align">
    <ul>
      <li class="musing__item" v-for="content in contents">
        <div class="published-date">
          <span>
            {{ content.day }}
          </span>
          <span>
            {{ content.month }}
          </span>
        </div>
        <h3 class="title">
          <NuxtLink :to="content?.slug">{{ content?.title }}</NuxtLink>
        </h3>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
definePageMeta({
  layout: "article",
});

const musings = await queryContent("essays").find();
const { data: notion } = await useFetch("/api/get-notion-posts");

const contents = computed(() => {
  const essays: HarmonizedArticle[] = musings.map((post) => {
    let { day, month } = useDateTimeComponent(post.last_edited);
    return {
      day,
      month,
      title: post.title,
      slug: post._path,
      source: "local",
      stage: post.stage,
      genre: post.genre,
    };
  });

  const notes: HarmonizedArticle[] = notion.value!.results.map((post) => {
    let { day, month } = useDateTimeComponent(post.last_edited_time);
    return {
      day,
      month,
      title: post.properties.name.title[0].plain_text,
      slug: `/notes/${post.properties.slug.rich_text[0].plain_text}`,
      source: "notion",
      stage: post.properties.stage.status.name,
      genre: post.properties.tags.multi_select[0].name,
    };
  });

  return [...essays, ...notes];
});
</script>

<style scoped lang="scss">
ul {
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
  font-size: var(--idealHeadingTwo);
  font-weight: 500;
  z-index: 2;
  position: relative;
  text-wrap: balance;

  a {
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
</style>
