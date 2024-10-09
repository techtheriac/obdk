<template>
  <div class="theme-toggle" role="button">
    <span></span>
    <span></span>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.theme-toggle {
  --size: 1.5ch;
  --half: calc(var(--size) / 2);
  display: flex;
  gap: 2px;
  font-size: var(--step-0);

  span {
    height: var(--size);
    width: var(--half);
  }

  span:nth-child(1) {
    border-radius: var(--half) 0 0 var(--half);
    background-color: var(--elevated-dark);
  }

  span:nth-child(2) {
    border-radius: 0 var(--half) var(--half) 0;
    background-color: var(--elevated-light);
  }
}
</style>
