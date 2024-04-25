<template>
  <div class="layout-base fill-height obdk-bg">
    <div class="obdk-bg__layer-one"></div>
    <!-- <Loader /> -->
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
  height: 100%;
  z-index: 1;
}
</style>
