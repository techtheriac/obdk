<template>
  <div class="content-align">
    <ul>
      <li class="musing__item" v-for="content in contents">
        <!-- <span>{{ content.genre }}</span>
        <span class="published">{{ useDateTime(content.date) }}</span> -->
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
    return {
      date: post.last_edited,
      title: post.title,
      slug: post._path,
      source: "local",
      stage: post.stage,
      genre: post.genre,
    };
  });

  const notes: HarmonizedArticle[] = notion.value!.results.map((post) => {
    return {
      date: post.last_edited_time,
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
.musing__item {
  --border-bg: #373737;
  padding: var(--space) 0;
  width: 100%;
  border-bottom: 1px dotted var(--border-bg);

  &__border-aug {
    --aug-border-all: 1px;
    --aug-border-bg: var(--border-bg);
    --aug-tl: 0px;
  }

  &__layout {
    grid-template-columns: repeat(6, 1fr);
    display: flex;
    flex-direction: column;
  }
}

ul {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: var(--idealHeadingTwo);
  text-transform: uppercase;
  font-weight: 500;
  z-index: 2;
  position: relative;
  color: var(--foreground-dark-dim-01);
  text-wrap: balance;

  a {
    color: #fff;
  }
}
</style>
