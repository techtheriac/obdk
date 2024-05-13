<template>
  <header>
    <h1 class="rum">essays</h1>
    <h1 class="rum">notes</h1>
    <h1 class="rum">poetry</h1>
  </header>
</template>
<style lang="scss" scoped>
header {
  width: 100%;
  padding-bottom: var(--space-xs);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
}
.rum {
  font-family: Galgo;
  text-transform: uppercase;
  font-size: 10vw;
}
</style>

<script setup lang="ts">
const chars = ["R", "U", "M", "I", "N", "A", "T", "I", "O", "N", "S"];
</script>
