<template>
  <main class="layout-base">
    <Home />
    <Stacked />
  </main>
</template>

<script setup lang="ts"></script>

<style scoped>
.layout-base {
  color: var(--foreground-dark);
  background-color: var(--background-dark);
  scroll-snap-type: y mandatory;
}
</style>
