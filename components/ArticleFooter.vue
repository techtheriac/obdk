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
  border-top: 1px dotted hsl(0 0% 20.5%);
  padding-top: var(--space-s);
  padding-bottom: var(--space-s);
  margin-top: var(--space-s);
  font-size: var(--idealSubFontSize);
}
span {
  display: flex;
  flex-direction: column;
  font-family: "TWK Lausanne";
  text-transform: capitalize;
  gap: var(--space-xs);
  font-weight: 200;
  a {
    color: rgba(255, 255, 255, 0.63);
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
