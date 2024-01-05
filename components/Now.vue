<template>
  <div class="now">
    <div class="title">{{ title }}</div>
    <slot></slot>
    <div class="info">
      <span class="description">{{ description }}</span>
      <span class="summary">{{ summary }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type SiteMap } from "~/obdk";
const props = defineProps<{
  title: SiteMap | string;
  description: string | undefined;
  summary: string | undefined;
}>();
</script>

<style scoped lang="scss">
@import "../assets/css/utilities/font-definitions";
.now {
  @include lausanneNormal(300, var(--idealBaseFontSize));
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-s);
  padding: var(--space-s) var(--space-xs) var(--space-s) var(--space-xs);
  padding: var(--space-xs);
  background-color: #1a1a1a4d;
  border: 1px solid #2e2e2e;
}

.title {
  align-self: flex-end;
  text-transform: capitalize;
}

.info {
  display: flex;
  flex-direction: column;
}
</style>
