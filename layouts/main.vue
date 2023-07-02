<template>
  <div class="layout-base">
    <Home />
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.layout-base {
  min-height: calc(100vh - 15px);
  padding: 20px 15px 0px 15px;
  width: calc(100vw - 30px);
}
</style>
