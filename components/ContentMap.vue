<template>
  <div class="content-map">← {{ path }}</div>
</template>

<script setup lang="ts">
let path = ref("");
onMounted(() => {
  if (!window) return;
  path.value = window.location.href;

  let arr = path.value.split("/").slice(3);
  console.log(arr);
});
</script>

<style scoped>
.content-map {
  border: 1px solid white;
  padding: var(--space-xs);
  width: 800px;
  align-self: center;
  text-transform: uppercase;
}
</style>
