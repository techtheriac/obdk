<template>
  <div
    ref="nowContainer"
    v-on:mouseenter="animateIn"
    v-on:mouseleave="animateOut"
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
import { gsap } from "gsap";
import { type SiteMap } from "~/obdk";

const props = defineProps<{
  title: SiteMap | string;
  description: string | undefined;
  summary: string | undefined;
}>();

function animateIn(e) {
  gsap.to(e.target, {
    "--aug-tl": "10px",
    duration: 0.2,
    ease: "sine.out",
  });
}

function animateOut(e) {
  gsap.to(e.target, {
    "--aug-tl": "0px",
    duration: 0.2,
    ease: "sine.in",
  });
}
</script>

<style scoped lang="scss">
@import "../assets/css/utilities/font-definitions";
.now {
  --border-bg: var(--border-color);
  @include lausanneNormal(300, var(--idealBaseFontSize));
  scroll-snap-align: start;
  color: var(--foreground-100);
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
