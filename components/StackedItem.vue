<template>
  <div>
    <div>
      <h2 class="stacked-header">
        {{ section == 'contact' ? 'get in touch' : section }}
      </h2>
    </div>
    <Musings v-if="section === 'musings'" />
    <Contact v-if="section === 'contact'" />
    <Essays v-if="section === 'essays'" />
  </div>
</template>

<script setup lang="ts">
import { Sections } from "~/obdk";

defineProps<{ section?: Sections }>();
</script>

<style lang="scss" scoped>
@import "../assets/css/utilities/font-definitions";

h2 {
  color: #000;
  @include gestaltCaps(400, var(--idealStackedHeading));
}
</style>
