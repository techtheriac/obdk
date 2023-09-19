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
import Lenis from "@studio-freight/lenis";
import { onMounted } from "vue";

const { data } = await useFetch("/api/get-recently-played");
const applicationInstance = new Application({ colors: data.value?.palette });
provide(applicationKey, applicationInstance);


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
