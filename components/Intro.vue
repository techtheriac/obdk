<template>
  <div class="intro">
    <Bio />
    <NowSlider />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.intro {
  --base-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 1px solid var(--border-color);
  min-height: calc(var(--base-height) - var(--header-height));
}
</style>
