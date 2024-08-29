<template>
  <div class="content-main obdk-bg" data-nav="article">
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
}
</style>
