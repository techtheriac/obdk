<template>
  <main class="layout-base fill-height">
    <Home />
    <Stacked />
    <Burger />
  </main>
</template>

<script setup lang="ts">
import { provide } from "vue";
import { applicationKey } from "~/obdk";
import { Application } from "~/utils/application";
import Lenis from "@studio-freight/lenis";
import { onMounted } from "vue";

const { data } = await useFetch("/api/get-recently-played");
const applicationInstance = new Application({ colors: data.value?.palette });
provide(applicationKey, applicationInstance);

onMounted(() => {
  applicationInstance.emit("update-viewport")
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
});
</script>

<style scoped>
.layout-base {
  color: var(--foreground-dark);
  background-color: var(--background-dark-07);
  background-image: linear-gradient(
      to right,
      rgb(203 213 225) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgb(203 213 225) 1px, transparent 1px);
  background-size: 1rem 1rem;
  background-position: center center;
}

.layout-base > section {
  height: inherit;
}
</style>
