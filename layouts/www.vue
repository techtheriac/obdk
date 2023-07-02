<template>
  <div class="www-base">
    <Path :path="fullPath" />
    <!-- <Frosted /> -->
    <main class="content-view">
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
  z-index: 8;
  position: fixed;
  top: 20px;
  height: 100%;
  width: inherit;
  background-color: black;
}
.content-view {
  z-index: 10;
}
</style>
