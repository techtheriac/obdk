<template>
  <div class="layout-base fill-height">
    <div class="layer"></div>
    <Navigation />
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout-base {
  display: flex;
  flex-direction: column;
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

.main {
  height: calc(100% - 1.5rem);
  z-index: 1;
}

.layer {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-color: var(--background-dark-07);
}
</style>
