<template>
  <!-- <div data-augmented-ui="tl-clip-x br-rect border" class="now"> -->
  <div data-augmented-ui="tl-clip-x border" class="now now__border-aug">
    <div class="title">{{ title }}</div>
    <slot></slot>
    <div class="info">
      <span class="description">{{ description }}</span>
      <span class="summary">{{ summary }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Now from "~/utils/animations/now";
import { type SiteMap } from "~/obdk";
const props = defineProps<{
  title: SiteMap | string;
  description: string | undefined;
  summary: string | undefined;
}>();

onMounted(() => {
  const nowElements = document.querySelectorAll(".now");
  if (!nowElements) return;
  new Now(nowElements);
});
</script>

<style scoped lang="scss">
@import "../assets/css/utilities/font-definitions";
.now {
  --border-bg: #373737;
  @include lausanneNormal(300, var(--idealBaseFontSize));
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-s);
  padding: var(--space-xs);

  &__border-aug {
    --aug-border-all: 1px;
    --aug-border-bg: var(--border-bg);
    --aug-tl: 0px;
  }
}

.title {
  align-self: flex-end;
  text-transform: capitalize;
}

.info {
  display: flex;
  flex-direction: column;
  font-weight: 200;
  gap: 0.3em;
}

.summary {
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
