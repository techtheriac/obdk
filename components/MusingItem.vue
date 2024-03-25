<template>
  <div class="musing__item musing__item__layout">
    <div>
      <span>{{ genre }}</span>
    </div>
    <div class="meta meta__layout">
      <span class="published">{{ publishedText }}</span>
    </div>
    <div class="title title__layout">
      <NuxtLink :to="path">
        <h2>{{ title }}</h2>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { parseISO, format } from "date-fns";
const props = defineProps<{
  title?: string;
  path?: string;
  genre: string;
  published?: string;
  stage?: string;
}>();

const publishedText = computed(() => {
  if (!props.published) return;

  const parsedDate = parseISO(props.published);
  const date = format(parsedDate, "do MMM yyyy");
  const time = format(parsedDate, "h:mm a");

  return `last updated on ${date} at ${time}`;
});
</script>

<style scoped lang="scss">
.musing__item {
  padding: var(--space-s) 0 var(--space-s) 0;
  width: 100%;
  border-top: 1px solid #ffffff91;

  &__layout {
    grid-template-columns: repeat(6, 1fr);
    display: flex;
    flex-direction: column;
  }
}

.meta {
  font-weight: 400;
  text-transform: uppercase;
  font-size: 14px;
  display: flex;

  &__layout {
    grid-column: 1 / 2;
  }

  span:nth-child(1) {
    font-weight: 400;
    padding-right: var(--space-xs);
    // border-right: 1px solid #fff;
  }

  span:nth-child(2) {
    padding-left: var(--space-xs);
  }
}
.title {
  width: max(100%, 75ch);

  &__layout {
    grid-column: 3 / -1;
  }

  a {
    font-size: var(--idealHeadingOne);
    color: #fff;
  }
}

.published {
  font-family: "Space Mono";
  font-weight: 400;
}
</style>
