<template>
  <NuxtLink :to="back">
    <span>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="14" height="2" transform="matrix(-1 0 0 1 14 4)"></rect>
        <rect
          width="8"
          height="2"
          transform="matrix(4.37114e-08 1 1 -4.37114e-08 14 6)"
        ></rect>
        <rect width="6" height="2" transform="matrix(-1 0 0 1 14 14)"></rect>
        <rect width="2" height="2" transform="matrix(-1 0 0 1 6 8)"></rect>
        <rect width="2" height="2" transform="matrix(-1 0 0 1 4 6)"></rect>
        <rect width="2" height="2" transform="matrix(-1 0 0 1 4 2)"></rect>
        <rect width="2" height="2" transform="matrix(-1 0 0 1 6 0)"></rect>
      </svg>
    </span>
    <span>
      {{ content }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  back: string;
  content: string;
}>();
</script>
<style lang="scss" scoped>
a {
  display: flex;
  color: var(--foreground-100);
  span:has(svg) {
    svg {
      width: 1rem;
      fill: var(--foreground-100);
    }
  }
}
</style>
