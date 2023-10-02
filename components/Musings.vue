<template>
  <div>
    <ul>
      <li v-for="content in data">
        <NuxtLink :to="content._path">{{ content.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData("musings", () =>
  queryContent("/www/musings").find()
);
</script>

<style scoped></style>
