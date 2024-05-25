<template>
  <div
    ref="nowContainer"
    data-augmented-ui="tl-clip-x border"
    class="now now__border-aug"
  >
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
  --border-bg: var(--border-color);
  --scalar: 5;
  @include lausanneNormal(300, var(--idealBaseFontSize));
  color: var(--foreground-100);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-s);
  padding: var(--space-xs);

  aspect-ratio: 3 / 4;
  grid-area: gui / challenges;
  transform-origin: bottom left;
  transform: rotate(var(--r, 0deg)) translateY(var(--t, 0px));

  &:hover {
    --t: -50px;
    z-index: 3;
  }

  &__border-aug {
    --aug-border-all: 1px;
    --aug-border-bg: transparent;
    --aug-tl: 10px;
  }
}

.title {
  align-self: flex-end;
  text-transform: capitalize;
}

.info {
  display: flex;
  flex-direction: column;
  font-weight: 300;
  gap: 0.3em;
  font-size: var(--idealSubFontSize);
}

.summary {
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--foreground-200);
}
</style>
