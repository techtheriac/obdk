<template>
  <div class="content-main obdk-bg" data-nav="article">
    <Navigation />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.content-main {
  padding-inline: var(--space-s);
  width: 100%;
  min-height: 100vh;
}
</style>
