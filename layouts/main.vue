<template>
  <main class="layout-base" id="scrollContainer">
    <Home />
    <Stacked />
  </main>
</template>

<script setup lang="ts">
import Lenis from "@studio-freight/lenis";

onMounted(() => {
  const scrollContainer = document.getElementById("scrollContainer");

  if (!scrollContainer) {
    return;
  }

  const lenis = new Lenis();

  lenis.on("scroll", (e) => {
    console.log(e);
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
