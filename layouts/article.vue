<template>
  <div class="content-main obdk-bg" data-nav="article">
    <Navigation />
    <section>
      <slot />
    </section>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.content-main {
  padding: var(--space-s) var(--space-s);
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  section {
    z-index: 2;
  }
}
</style>
