<template>
  <main class="layout-base fill-height">
    <Home />
    <Burger />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { LandingAnimatable } from "~/utils/animations/landing";
import { Application } from "~/utils/application";

onMounted(() => {
  const animatables: LandingAnimatable = {
    techtheriac: document.querySelector(".obdk")!,
    bio: document.querySelector(".bio")!,
    burger: document.querySelector(".burger")!,
    playing: document.querySelector(".spotify")!,
  };

  new Application(animatables);
});
</script>

<style scoped>
.layout-base {
  --size-background: 1rem;
  color: var(--foreground-dark);
  background-color: var(--background-dark-07);
  background-image: linear-gradient(
      to right,
      rgb(203 213 225) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgb(203 213 225) 1px, transparent 1px);
  background-size: var(--size-background) var(--size-background);
}
.layout-base > section {
  height: inherit;
}
</style>
