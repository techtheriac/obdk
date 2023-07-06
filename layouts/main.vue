<template>
  <div class="layout-base">
    <Home />
    <Noise />
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.layout-base {
  min-height: calc(100vh);
  /* padding: 20px 15px 0px 15px; */
  width: calc(100vw);
  color: var(--foreground-dark);
  background-color: var(--background-dark);
}
</style>
