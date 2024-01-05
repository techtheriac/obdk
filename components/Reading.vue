<template>
  <Now title="reading" description="Recommended readings" :summary="summary">
    <div>Reading content goes here</div>
  </Now>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/get-arena-blocks");
const summary = computed(() => {
  return `${data?.value.length} blocks`;
});
</script>
<style scoped></style>
