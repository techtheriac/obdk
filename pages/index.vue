<template>
  <main>
    <Intro />
    <SubmissionsIndex />
    <LabFeatured />
    <PreFooter />
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
    navigation: document.querySelector(".navigation")!,
  };

  new Application(animatables);
});
</script>
<style></style>
