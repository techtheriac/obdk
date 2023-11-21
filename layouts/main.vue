<template>
  <div class="layout-base">
    <Burger />
    <slot />
  </div>
</template>

<style scoped>
.layout-base {
  --size-background: 1rem;
  color: var(--foreground-dark);
  background-color: var(--background-dark-07);
  background-image: linear-gradient(
      to right,
      rgb(203 213 225) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgb(203 213 225) 1px, transparent 1px);
  background-size: var(--size-background) var(--size-background);
}
</style>
