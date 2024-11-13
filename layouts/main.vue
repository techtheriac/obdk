<template>
  <div
    id="main-layout"
    class="layout-main"
    :class="{ loading: $route.fullPath == '/' }"
  >
    <Techtheriac />
    <main class="main" role="main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.layout-main {
  display: flex;
  flex-direction: column;
  color: var(--foreground-100);
  padding-inline: var(--space-xs);
}
.main {
  min-height: 100vh;
}
</style>

<script setup lang="ts"></script>
