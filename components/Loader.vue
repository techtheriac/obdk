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
  --size-background: 5rem;
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
  background-image: linear-gradient(
      to right,
      var(--foreground-dark-forest) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      var(--foreground-dark-forest) 1px,
      transparent 1px
    );
  background-size: var(--size-background) var(--size-background);

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: inherit;
  }
}
</style>
