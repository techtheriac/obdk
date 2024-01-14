<template>
  <div>
    <h1>articles</h1>
    <ul>
      <li>titles</li>
    </ul>
  </div>
  <div>
    <Ruminations />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "article",
});
const musings = await queryContent("www/musings");
</script>

<style scoped></style>
