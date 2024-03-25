<template>
  <div class="published-title">
    <span class="published published__article">{{ dateTime }}</span>
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

const dateTime = computed(() => {
  if (!props.date) return;
  return useDateTime(props.date);
});
</script>

<style scoped>
.published-title {
  position: relative;
  height: auto;
}

.published__article {
  color: rgba(255, 255, 255, 0.63);
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}

.title {
  text-transform: capitalize;
  font-size: var(--idealHeadingOne);
  font-weight: 700;
  margin-bottom: var(--space-s);
  margin-top: var(--space-xs);
  line-height: 0.89;
  letter-spacing: -1.22px;
  z-index: 2;
  position: relative;
  color: #ededed;
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
