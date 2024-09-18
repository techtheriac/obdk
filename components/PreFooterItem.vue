<template>
  <div class="pre-foot">
    <h2>{{ title }}</h2>
    <p v-if="meta">
      {{ meta }}
    </p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  meta?: string;
}>();
</script>

<style lang="scss" scoped></style>
