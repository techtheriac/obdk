<template>
  <div ref="nowContainer" data-augmented-ui="tl-clip-x border" class="now">
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
.now {
  --border-bg: var(--border-color);
  --aug-border-all: 1px;
  --aug-border-bg: transparent;
  --aug-tl: 10px;

  color: var(--foreground-100);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-xs);
  padding: var(--space-xs);
  border: 1px dotted var(--border-color);
  font-size: var(--step--2);
  max-height: 250px;
}

.title {
  align-self: flex-end;
  text-transform: capitalize;
}

.info {
  display: flex;
  flex-direction: column;
  font-weight: 400;
  gap: 0.3em;
}
.summary {
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
