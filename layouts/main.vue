<template>
  <div class="layout-base fill-height obdk-bg">
    <div class="obdk-bg__layer-one"></div>
    <div class="obdk-bg__layer-two"></div>
    <!-- <Navigation /> -->
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout-base {
  display: flex;
  flex-direction: column;
  color: var(--foreground-dark);
}

.main {
  height: calc(100% - 1.5rem);
  z-index: 1;
}
</style>
