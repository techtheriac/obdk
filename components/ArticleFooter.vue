<template>
  <footer>
    <span>
      <small>previous</small>
      <NuxtLink :to="previous.slug">{{ previous.title }}</NuxtLink>
    </span>
    <span>
      <small>next</small>
      <NuxtLink :to="next.slug">{{ next.title }}</NuxtLink>
    </span>
  </footer>
</template>

<script setup lang="ts">
import { HarmonizedArticle } from "~/obdk";

const props = defineProps<{
  currentSlug: string;
  contents: HarmonizedArticle[];
}>();

const { next, previous } = usePreviousNext(props.currentSlug, props.contents);
</script>
<style scoped></style>
