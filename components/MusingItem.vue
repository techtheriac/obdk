<template>
  <div class="musing__item musing__item__layout">
    <div class="meta meta__layout">
      <Rounded :genre="genre" />
      <span>{{ publised }}</span>
    </div>
    <div class="title title__layout">
      <NuxtLink :to="path">
        <h2>{{ title }}</h2>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  path?: string;
  genre: string;
  publised?: string;
}>();
</script>

<style scoped lang="scss">
.musing__item {
  display: grid;
  padding: var(--space-s) 0 var(--space-s) 0;
  width: 100%;
  border-top: 1px solid #ffffff91;

  &__layout {
    grid-template-columns: repeat(6, 1fr);
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
    border-right: 1px solid #fff;
  }

  span:nth-child(2) {
    padding-left: var(--space-xs);
  }
}
.title {
  width: min(100%, 50ch);

  &__layout {
    grid-column: 3 / -1;
  }

  a {
    font-size: var(--idealHeadingTwo);
    color: #fff;
  }
}

@media screen and (max-width: 800px) {
  .musing__item__layout {
    grid-template-rows: auto 1fr;
    gap: var(--space-s);
  }
  .meta__layout {
    grid-column: 1 / -1;
    grid-row: 1 / 2;
  }

  .title__layout {
    grid-column: 1 / -1;
    grid-row: 2 / -1;
  }
}
</style>
