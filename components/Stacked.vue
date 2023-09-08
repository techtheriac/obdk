<template>
  <section class="stacked">
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
import { onMounted, onUnmounted } from "vue";
import { Sections } from "~/obdk";
import { storeToRefs } from "pinia";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

const stackStore = useStackStore();

const { stackOrder } = storeToRefs(stackStore);

function updateStackedHeaderSize(): number {
  const stackedHeader = document.querySelector(".stacked-header");
  if (!stackedHeader) return 0;

  let stackedHeight = stackedHeader.getBoundingClientRect().height;

  document.documentElement.style.setProperty(
    "--stacked-header-size",
    `${stackedHeight / 2}px`
  );

  return stackedHeight;
}

onMounted(() => {
  const stackedHeaderHeight = updateStackedHeaderSize();

  window.addEventListener("resize", () => updateStackedHeaderSize());

  const stackedItems = document.querySelectorAll("[data-stack-order]");

  if (!stackedItems) return;

  const newContainer = document.querySelector(".stacked");
  const nowPlaying = document.querySelector(".spotify");
  const originalContainer = document.querySelector("footer");

  const firstInStack = document.querySelector("[data-stack-order='0']");
  const secondInStack = document.querySelector("[data-stack-order='1']");
  const thirdInStack = document.querySelector("[data-stack-order='2']");

 // [firstInStack, secondInStack].forEach((section) => {
 //   gsap.from(section, {
 //     yPercent: 30,
 //     ease: "none",
 //     overwrite: true,
 //     stagger: 0.5,
 //     opacity: 0,
  //    scrollTrigger: {
  //      trigger: thirdInStack,
 //       toggleActions: "restart pause reverse pause",
 //       //toggleActions: "restart none none none",
 //       start: "top center",
 //       end: `bottom 100%`,
 //       scrub: 1,
 //       onToggle: (e) => performFlip(e),
 //       // pin: true,
 //       pinSpacing: false,
 //     },
 //   });
 // });

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

onUnmounted(() => {
  window.removeEventListener("resize", updateStackedHeaderSize);
});
</script>

<style lang="scss" scoped>
.stacked {
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 0 var(--space-xs);
}

.stacked > div {
  position: absolute;
  width: 100%;
}

[data-stack-order="2"] {
  z-index: 1;
}

[data-stack-order="1"] {
  top: var(--stacked-header-size);
  z-index: 2;
}

[data-stack-order="0"] {
  top: calc(2 * var(--stacked-header-size));
  z-index: 3;
}

.musings {
  background-color: var(--essays-bg);
}

.essays {
  background-color: var(--contact-bg);
}

.contact {
  background-color: var(--musings-bg);
}

.stacked > div {
  display: flex;
  flex-direction: column;
  height: 100%;
  transition-property: background-color;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}
</style>
