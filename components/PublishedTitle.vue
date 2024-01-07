<template>
  <div class="published-title">
    <span class="published">{{ date }}</span>
    <h1 class="title" :style="{ '--accent-color': getColorFromGenre(genre) }">
      {{ title }}
    </h1>
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
</script>

<style scoped>
.published-title {
  position: relative;
  height: auto;
}
.published {
  color: rgba(255, 255, 255, 0.63);
  font-family: "TWK Lausanne";
  font-size: 14px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  text-transform: uppercase;
  padding: calc(var(--space-xs) / 2);
}
.title {
  /* --accent-color: rgba(255, 0, 0, 0.228); */
  text-transform: capitalize;
  font-size: var(--idealHeadingOne);
  font-weight: 750;
  margin-bottom: var(--space);
  margin-top: var(--space-xs);
  line-height: 0.89;
  letter-spacing: -1.22px;
  z-index: 2;
  position: relative;

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
