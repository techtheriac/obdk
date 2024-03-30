<template>
  <ul v-if="backlinks">
    <li v-for="backlink in backlinks">
      <NuxtLink :to="backlink.slug">{{ backlink.title }}</NuxtLink>
    </li>
  </ul>
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

<style scoped lang="scss"></style>
