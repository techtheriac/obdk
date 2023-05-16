<template>
  <NuxtLink :to="navigationOption.path">
    <div v-if="navigationOption.type === 'File'">
      <Document />
    </div>
    <div v-else>
      <Folder />
    </div>
    {{ navigationOption.name }}
  </NuxtLink>
</template>

<script setup lang="ts">
import { NavigationItemOption } from "~/types";
import { type PropType } from "vue";
const props = defineProps({
  navigationOption: {
    type: Object as PropType<NavigationItemOption>,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
