<template>
  <section class="home-container fill-height">
    <div class="wrapper-bio">
      <Techtheriac />
      <Bio />
    </div>
    <Spotify />
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  padding: 0 var(--space-xs) var(--space-xs);
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
  background-color: var(--background-dark-07);
  transition-duration: 1s;
  transition-property: background-color;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.wrapper-bio {
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}
</style>
