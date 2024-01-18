<template>
  <div class="loader fill-height">
    <div>
      <Techtheriac :is-flip-destination="false" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.loader {
  --size-background: var(--size-background-base);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--background-dark-07);
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
    padding-right: var(--space-xs);
    padding-left: var(--space-xs);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: inherit;
  }
}
</style>
