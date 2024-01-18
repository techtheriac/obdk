<template>
  <div class="loader">
    <div>
      <Techtheriac :is-flip-destination="false" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.loader {
  --size-background: 1rem;
  height: 100dvh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--background-dark-07);
  padding-left: var(--space-s);
  padding-right: var(--space-s);

  div {
    position: absolute;
    top: 50%;
    width: inherit;
  }
}
</style>
