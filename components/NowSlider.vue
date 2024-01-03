<template>
  <div class="now-slider">
    <div v-for="content in maps">
      <Now
        :title="content.title"
        :description="content.description"
        :summary="content.summary"
      >
      </Now>
    </div>
  </div>
</template>

<script setup lang="ts">
const maps = ref([
  {
    title: "writing",
    description: "musings & ramblings",
    summary: "10 items",
  },
  {
    title: "reading",
    description: "Recently read books",
    summary: "56 books",
  },
  {
    title: "blocks",
    description: "curated arena channels",
    summary: "10 blocks",
  },
  {
    title: "listening",
    description: "recently played track",
    summary: "song title * artist",
  },
]);
</script>

<style scoped lang="scss">
.now-slider {
  display: flex;
}
</style>
