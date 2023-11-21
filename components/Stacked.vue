<template>
  <section class="stacked hidden">
    <StackedItem
      v-for="(section, key, index) in stackOrder"
      :section="key"
      :class="key"
      :stackOrder="section"
    />
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import StackedAnimation from "~/utils/animations/stacked";
const stackStore = useStackStore();
const { stackOrder } = storeToRefs(stackStore);

let stackedAnimation;

onMounted(() => {
  stackedAnimation = new StackedAnimation(document.querySelector(".stacked")!);
  stackedAnimation.play();
});

onBeforeUnmount(() => {
  stackedAnimation.reverse();
});
</script>

<style lang="scss" scoped>
.stacked {
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 0 var(--space-xs);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}

[data-stack-order="2"] {
  z-index: 1;
}

[data-stack-order="1"] {
  left: var(--stacked-header-size);
  z-index: 2;
}

[data-stack-order="0"] {
  left: calc(2 * var(--stacked-header-size));
  z-index: 3;
}
</style>
