<template>
  <main>
    <Intro />
    <SubmissionsIndex />
  </main>
</template>

<script setup lang="ts">
import { type LandingAnimatable } from "~/utils/animations/landing";
import { Application } from "~/utils/application";

definePageMeta({
  layout: "main",
});

onMounted(() => {
  const animatables: LandingAnimatable = {
    techtheriac: document.querySelector(".obdk")!,
    bio: document.querySelector(".bio")!,
    nowSlider: document.querySelector(".now-slider")!,
    flipContainer: document.querySelector(".flip-container")!,
    preloader: document.querySelector(".loader")!,
  };

  new Application(animatables);
});
</script>
<style></style>
