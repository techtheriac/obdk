<template>
  <div class="page-title">
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<style scoped lang="scss">
.page-title {
  padding-block: var(--space-s);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-family: "Grotesque";
    font-size: var(--step-2);
    text-transform: capitalize;
  }
}
</style>
