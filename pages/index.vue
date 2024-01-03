<template>
  <main class="home-container">
    <Bio />
    <NowSlider />
    <div class="flow-hr-xs">
      <Spotify />
      <Techtheriac />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { type LandingAnimatable } from "~/utils/animations/landing";
import { Application } from "~/utils/application";

definePageMeta({
  layout: "main",
});

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
.home-container {
  display: flex;
  padding: 0 var(--space-xs) var(--space-xs);
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
  transition-duration: 1s;
  transition-property: background-color;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: 100%;
}
.flow-hr-xs {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}
</style>
