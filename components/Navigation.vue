<template>
  <NuxtLink class="navigation" :to="route">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="72"
      height="23"
      fill="none"
      viewBox="0 0 72 23"
    >
      <path
        stroke="#fff"
        d="M1 12c6.012.536 10.105 1.364 12.282 2.484 2.177 1.12 4.557 3.626 7.142 7.516M72 12H1h71ZM1 12c6.012-.536 10.105-1.364 12.282-2.484C15.459 8.396 17.839 5.89 20.424 2L1 12Z"
      />
    </svg>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  route: string;
  text: string;
}>();
</script>
<style lang="scss" scoped>
.navigation {
  height: 40px;
  width: 40px;
  position: relative;
  padding: var(--space) 0;
}
</style>
