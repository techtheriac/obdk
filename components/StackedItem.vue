<template>
  <div :data-stack-order="stackOrder" @click="updateStackOrder">
    <h2 class="stacked-header">
      {{ section == "contact" ? "get in touch" : section }}
    </h2>
    <Musings v-if="section === 'musings'" />
    <Contact v-if="section === 'contact'" />
    <Essays v-if="section === 'essays'" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Sections } from "~/obdk";

const stackStore = useStackStore();

const props = defineProps<{
  section?: Sections;
  stackOrder: number;
}>();

const order = ref(props.stackOrder);

function updateStackOrder(): void {

 const stackOrder = order.value == 0 ? [0, 1, 2] : order.value == 1 ? [1, 0, 2] : [2, 0, 1]

 stackStore.updateStackOrder(stackOrder);
}
</script>

<style lang="scss" scoped>
@import "../assets/css/utilities/font-definitions";

h2 {
  color: #000;
  @include gestaltCaps(400, var(--idealStackedHeading));
}
</style>
