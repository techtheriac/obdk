<template>
  <div class="path">
    <div>←</div>
    <div>{{ path }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  path: String,
});
</script>

<style scoped>
.path {
  display: flex;
}
</style>
