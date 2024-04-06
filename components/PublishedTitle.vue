<template>
  <div class="published-title">
    <h1 class="title" :style="{ '--accent-color': getColorFromGenre(genre) }">
      {{ title }}
    </h1>
    <span class="published published__article">{{ dateTime }}</span>
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
.published-title {
  position: relative;
  height: auto;
  border-bottom: 1px solid hsl(0 0% 20.5%);
  padding: var(--space-xs) 0 var(--space-xs);
  margin-bottom: var(--space-s);
}

.published__article {
  color: rgba(255, 255, 255, 0.63);
  font-size: var(--idealSubFontSize);
  font-weight: 300;
  line-height: normal;
  display: block;
  margin-top: var(--space-xs);
}

.title {
  font-size: var(--idealHeadingOne);
  font-weight: 600;
  /* line-height: 0.89; */
  letter-spacing: -1.22px;
  z-index: 2;
  position: relative;
  color: #ededed;
  text-wrap: pretty;

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
