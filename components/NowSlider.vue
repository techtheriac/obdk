<template>
  <div class="now-slider hidden">
    <Garden />
    <Spotify />
    <Reading />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.now-slider {
  display: flex;
  gap: var(--space-xs);
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -ms-scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
