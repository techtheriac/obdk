<template>
  <div class="rounded" :style="{ 'background-color': colorMap[genre] }"></div>
</template>

<script setup lang="ts">
const props = defineProps<{
  genre: string;
}>();
const colorMap = ref({
  musing: "#FF6600",
  engineering: "#FF9200",
  poetry: "#87A19E",
});
</script>

<style lang="scss" scoped>
.rounded {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
</style>
