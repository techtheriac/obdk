<template>
  <main class="layout-base">
    <Home />
    <Stacked />
  </main>
</template>

<script setup lang="ts">
import { provide } from "vue";
import { applicationKey } from "~/obdk";
import { Application } from "~/utils/application";
const { data } = await useFetch("/api/get-recently-played");

const applicationInstance = new Application({ colors: data.value?.palette });

provide(applicationKey, applicationInstance);

import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted } from "vue";

onMounted(() => {
  const lenis = new Lenis({
    lerp: 0.2,
    easing: (x) => 1 - Math.sqrt(1 - Math.pow(x, 2)),
  });
  lenis.on("scroll", (e) => {
    // console.log(e);
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  const firstInStack = document.querySelector("[data-stack-order='0']");
  const secondInStack = document.querySelector("[data-stack-order='1']");
  const thirdInStack = document.querySelector("[data-stack-order='2']");

  const newContainer = document.querySelector(".stacked");
  const nowPlaying = document.querySelector(".spotify");
  const originalContainer = document.querySelector("footer");

  if (!nowPlaying) return;

  const { height } = nowPlaying.getBoundingClientRect();

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Flip);

  [firstInStack, secondInStack].forEach((section) => {
    gsap.from(section, {
      yPercent: 30,
      ease: "none",
      overwrite: true,
      stagger: 0.5,
      opacity: 0,
      scrollTrigger: {
        trigger: "[data-stack-order='2']",
        toggleActions: "restart pause reverse pause",
        //toggleActions: "restart none none none",
        start: "top center",
        end: `bottom 100%`,
        scrub: 1,
        onToggle: (e) => performFlip(e),
        // pin: true,
        pinSpacing: false,
      },
    });
  });

  function performFlip(e) {
    // console.log(e);

    // if direction is down,
    // translate from top else translate from bottom
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

<style scoped>
.layout-base {
  color: var(--foreground-dark);
  background-color: var(--background-dark);
}

.layout-base > section {
  height: 100vh;
}
</style>
