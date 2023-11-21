<template>
  <div class="content-main">
    <slot />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.content-main {
  padding-top: var(--space-m);
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: "TWK Lausanne";
  min-height: 100vh;
  background-color: var(--musings-bg);
  color: #fff;
}
</style>
