<template>
  <section>
    <div class="outside">
      <div class="elsewhere">
        <Morphisms />
        <Outside />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.elsewhere {
  display: flex;

  > div {
    max-width: 400px;
    padding: var(--space-s);
  }

  > * + * {
    border-left: 1px solid var(--border-color);
  }
}
</style>
