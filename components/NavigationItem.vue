<template>
  <NuxtLink class="navigation-item" :to="navigationOption.path">
    <div v-if="navigationOption.type === 'File'">
      <Document />
    </div>
    <div v-else>
      <Folder />
    </div>
    <span class="label">
      {{ navigationOption.name }}
    </span>
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
<style lang="scss" scoped>
@import "../assets/css/utilities/font-definitions";
.label {
  @include degularCaps(300, var(--idealBaseFontSize));
  color: #fff;
}
.navigation-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
</style>
