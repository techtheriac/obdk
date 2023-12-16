<template>
  <div class="content-main">
    <slot />
  </div>
</template>

<script setup>
import Lenis from "@studio-freight/lenis";
import { onMounted } from "vue";

onMounted(() => {
  const lenis = new Lenis({
    smoothTouch: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});
</script>

<style lang="scss" scoped>
.content-main {
  padding-top: var(--space-m);
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: "TWK Lausanne";
  min-height: 100vh;
  background-color: var(--musings-bg);
  color: #fff;
}
</style>
