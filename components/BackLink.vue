<template>
  <section v-if="backlinks.length > 0">
    <small>Backlinks</small>
    <ul>
      <li v-for="backlink in backlinks">
        <NuxtLink :to="backlink.slug">{{ backlink.title }}</NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { Backlink } from "~/obdk";

const props = defineProps<{
  backlinks: { id: string }[];
}>();

async function getRelatedDetailsFromPageId({ id }): Promise<Backlink> {
  const { data } = await useFetch(`/api/get-notion-slug-by-id/${id}`);
  return data.value as Backlink;
}

const backlinks = await Promise.all(
  props.backlinks.map(getRelatedDetailsFromPageId),
);
</script>

<style scoped lang="scss">
section {
  border-top: 1px dotted var(--border-color);
  padding-top: var(--space-s);
}
small {
  font-weight: 400;
  margin-bottom: var(--space-xs);
  font-size: var(--idealArticleParagraphSize);
  display: block;
  text-decoration: underline;
}

ul {
  li + li {
    margin-top: var(--space-xs);
  }
  li {
    a {
      color: var(--foreground-100);
      font-weight: 300;
      font-size: var(--idealArticleParagraphSize);
      text-decoration: line-through;
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
