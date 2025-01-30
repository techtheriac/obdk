<template>
  <h1>{{ title }}</h1>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<style scoped lang="scss">
h1 {
  font-family: "Grotesque";
  font-size: var(--step-2);
  text-transform: capitalize;
}
</style>
