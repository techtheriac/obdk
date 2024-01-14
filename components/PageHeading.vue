<template>
  <div id="obdk">
    <svg
      class="obdk hidden"
      :viewBox="viewBox"
      xmlns="http://www.w3.org/2000/svg"
    >
      <slot></slot>
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  viewBox: string;
}>();
</script>

<style lang="scss" scoped>
#obdk {
  width: 100%;
  svg {
    width: 100%;
    fill: var(--foreground-08);
  }
}
.opacity {
  opacity: 0;
}
</style>
