<template>
  <section>
    <span>
      <small>previous</small>
      <NuxtLink :to="previous.slug">{{ previous.title }}</NuxtLink>
    </span>
    <span>
      <small>next</small>
      <NuxtLink :to="next.slug">{{ next.title }}</NuxtLink>
    </span>
  </section>
</template>

<script setup lang="ts">
import { HarmonizedArticle } from "~/obdk";

const props = defineProps<{
  currentSlug: string;
  contents: HarmonizedArticle[];
}>();

const { next, previous } = usePreviousNext(props.currentSlug, props.contents);
</script>

<style scoped lang="scss">
section {
  display: flex;
  justify-content: space-between;
  border-top: 1px dotted var(--border-color);
  padding-top: var(--space-xs);
  font-size: var(--idealSubFontSize);
}
span {
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
  gap: var(--space-xs);
  font-weight: 200;
  a {
    color: var(--foreground-200);
    &:hover {
      text-decoration: underline;
    }
  }
}

span:nth-child(2) {
  align-items: flex-end;
  text-align: right;
}
</style>
