<template>
    <main class="content-main">
      <slot />
    </main>
</template>

<script setup></script>

<style lang="scss" scoped>
.content-main {
  padding-inline: var(--space-s);
  width: 100%;
}
</style>
