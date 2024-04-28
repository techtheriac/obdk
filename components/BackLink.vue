<template>
  <section v-if="backlinks.length > 0">
    <small>Backlinks</small>
    <ul>
      <li v-for="backlink in backlinks">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="16"
          viewBox="0 0 27 16"
          fill="none"
        >
          <path
            d="M26.0103 0.499994L26.0103 9.36302L2.11919 9.32774M2.11919 9.32774C5.45861 9.74908 7.73224 10.3957 8.94007 11.2676C10.1483 12.1394 10.568 11.4759 12 14.5L2.11919 9.32774ZM2.11919 9.32774C5.45984 8.91628 7.73537 8.27639 8.94577 7.40808C10.1565 6.53977 12.059 5.5199 13.5 2.5"
            stroke="#fff"
          />
        </svg>
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
small {
  font-weight: 500;
  margin-bottom: var(--space-xs);
  font-size: var(--idealArticleParagraphSize);
  display: block;
  text-decoration: underline;
}

ul {
  li {
    svg {
      margin-right: 0.5em;
      transform: scale(0.7);
    }
    a {
      color: var(--foreground-dark-dim);
      font-weight: 300;
      font-size: var(--idealArticleParagraphSize);
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
