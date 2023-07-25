<template>
  <div class="layout-base">
    <Home />
    <!-- <Noise /> -->
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.layout-base {
  min-height: 100vh;
  width: 100vw;
  color: var(--foreground-dark);
  background-color: var(--background-dark);
}
</style>
