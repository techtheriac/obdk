<template>
  <div class="layout-base obdk-bg">
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
