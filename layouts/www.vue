<template>
  <div class="www-base">
    <Frosted />
    <main class="content-view">
      <Path :path="fullPath" />
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { fullPath } = useRoute();
</script>

<style lang="scss" scoped>
.www-base {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: inherit;
}
.content-view {
  z-index: 10;
  position: absolute;
  inset: 0;
}
</style>
