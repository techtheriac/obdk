<template>
  <h1>
    <span>Software Engineer</span>
    <span>&</span>
    <span>Designer</span>
  </h1>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
h1 {
  font-weight: 300;
  font-size: 2rem;
  display: flex;
  gap: 10px;
  color: var(--foreground-dark-dim);
}
@media only screen and (min-width: 1025px) {
  h1 {
    font-size: 65px;
    line-height: 100%;
    letter-spacing: -0.045em;
  }
}
</style>
