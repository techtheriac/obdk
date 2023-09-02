<template>
  <div>
    <div>
      <h2 class="stacked-header">
        {{ section }}
      </h2>
    </div>
    <Musings v-if="section === 'musings'" />
    <Contact v-if="section === 'contact'" />
    <Musings v-else="section === 'essays'" />
  </div>
</template>

<script setup lang="ts">
import { Sections } from "~/obdk";

defineProps<{ section?: Sections }>();
</script>

<style scoped>
h2 {
  color: #000;
  font-size: var(--idealStackedHeading);
  text-transform: uppercase;
}
</style>
