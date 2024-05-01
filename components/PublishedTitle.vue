<template>
  <div class="page-info-wrapper">
    <div class="page-info">
      <h1 class="title" :style="{ '--accent-color': getColorFromGenre(genre) }">
        {{ title }}
      </h1>
    </div>
    <div class="page-meta">
      <span class="published-date">{{ dateTime }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type Genre } from "~/obdk";
import { getColorFromGenre } from "~/utils/color";

const props = defineProps<{
  title: string;
  date: string;
  genre: string | Genre;
}>();

const dateTime = computed(() => {
  if (!props.date) return;
  return useDateTime(props.date);
});
</script>

<style scoped>
.page-info {
  margin-top: 35vh;
  min-height: 20vh;
}
.page-info-wrapper {
  position: relative;
  height: auto;
}

.page-meta {
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  padding: var(--space-xs) 0;
  color: var(--foreground-200);
}

.published-date {
  font-size: var(--idealSubFontSize);
  font-weight: 200;
  line-height: normal;
  display: block;
}

.title {
  font-size: var(--idealHeadingTwo);
  font-weight: 500;
  z-index: 2;
  position: relative;
  color: var(--foreground-100);
  text-wrap: balance;

  &::before {
    content: "";
    width: 2em;
    height: 1em;
    position: absolute;
    top: 0;
    background-color: var(--accent-color);
    z-index: 1;
  }
}
</style>
