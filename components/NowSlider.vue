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
  display: grid;
  grid: [gui] 1fr / [challenges] min(25vmin, 40ch);
  width: 100%;
  margin-top: var(--space);

  > div:nth-child(1) {
    background-color: var(--accent-yellow);
    --r: calc(var(--scalar, 5) * 4 * 1deg);
  }
  > div:nth-child(2) {
    background-color: var(--accent-purple);
    --r: calc(var(--scalar, 5) * 6 * 1deg);
  }
  > div:nth-child(3) {
    background-color: var(--accent-blue);
    --r: calc(var(--scalar, 5) * 1deg);
  }
}
</style>
