<template>
  <div class="layout-base fill-height obdk-bg" data-nav="home">
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
  color: var(--foreground-dark);
}

.main {
  height: 100%;
  z-index: 1;
}
</style>
