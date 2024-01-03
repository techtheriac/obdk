<template>
  <div class="now">
    <div class="title">{{ title }}</div>
    <slot name="content">
      <h1>Content is not added</h1>
    </slot>
    <div class="description">{{ description }}</div>
    <div class="summary">{{ summary }}</div>
  </div>
</template>

<script setup lang="ts">
import { type SiteMap } from "~/obdk";
const props = defineProps<{
  title: SiteMap | string;
  description: string;
  summary: string;
}>();
</script>

<style scoped lang="scss">
.now {
  display: flex;
  flex-direction: column;
}
</style>
