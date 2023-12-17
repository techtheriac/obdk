<template>
  <div>
    <div v-if="section == 'essays'" class="stacked-header">
      <h1>lab</h1>
    </div>
    <div v-if="section == 'musings'" class="stacked-header">
      <h1>writing</h1>
    </div>
    <div v-if="section == 'contact'" class="stacked-header">
      <h1>contact</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Sections } from "~/obdk";
const props = defineProps<{
  section?: Sections;
}>();
</script>

<style scoped>
.stacked-header {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-xs);

  h1 {
    text-transform: uppercase;
    font-family: "TWK Lausanne";
    font-size: var(--idealHeadingOne);
  }

  svg {
    path {
      fill: var(--foreground-08);
    }
  }
}
</style>
