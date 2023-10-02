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
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

const stackStore = useStackStore();

const { stackOrder } = storeToRefs(stackStore);

onMounted(() => {
  const stackedItems = document.querySelectorAll("[data-stack-order]");

  if (!stackedItems) return;

  const newContainer = document.querySelector(".stacked");
  const nowPlaying = document.querySelector(".spotify");
  const originalContainer = document.querySelector("footer");

  function performFlip(e) {
    const state = Flip.getState(nowPlaying);
    if (!nowPlaying) return;
    (nowPlaying?.parentNode === originalContainer
      ? newContainer
      : originalContainer
    )?.appendChild(nowPlaying);

    Flip.from(state, { duration: 0.5, ease: "none", y: "30px" });
  }
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
