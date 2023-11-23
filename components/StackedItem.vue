<template>
  <div
    class="stacked_item fill-height"
    :data-stack-order="stackOrder"
    @click="updateStackOrder"
  >
    <StackedHeader :section="section" />
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
  const stackOrder =
    order.value == 0 ? [0, 1, 2] : order.value == 1 ? [1, 0, 2] : [2, 0, 1];
  stackStore.updateStackOrder(stackOrder);
}

function updateStackedHeaderSize(): number {
  const stackedHeader = document.querySelector(".stacked-header");
  if (!stackedHeader) return 0;

  let stackedHeight = stackedHeader.getBoundingClientRect().height;

  document.documentElement.style.setProperty(
    "--stacked-header-size",
    `${stackedHeight / 1.65}px`,
  );

  return stackedHeight;
}

onMounted(() => {
  updateStackedHeaderSize();
  window.addEventListener("resize", () => updateStackedHeaderSize());
});

onUnmounted(() => {
  window.removeEventListener("resize", updateStackedHeaderSize);
});
</script>

<style lang="scss" scoped>
@import "../assets/css/utilities/font-definitions";
.stacked_item {
  position: absolute;
  display: flex;
  flex-direction: column;
  transition-property: background-color;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  width: 100%;
  background-color: var(--background-dark-07);

  > div {
    padding: var(--space-xs);
  }
}
</style>
