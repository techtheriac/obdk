<template>
  <Intro />
  <div class="below-the-fold">
    <SubmissionsIndex />
    <LabFeatured />
    <PreFooter />
  </div>
</template>

<script setup lang="ts">
import { type LandingAnimatable } from "~/utils/animations/landing";
import { Application } from "~/utils/application";

onMounted(() => {
  const body = document.querySelector("#main-layout")! as HTMLElement;

  const animatables: LandingAnimatable = {
    techtheriac: document.querySelector(".obdk")!,
    bio: document.querySelector(".bio")!,
    nowSlider: document.querySelector(".now-slider")!,
    flipContainer: document.querySelector(".flip-container")!,
    navigation: document.querySelector(".navigation")!,
    header: document.querySelector(".header")!,
    body,
  };

  const app = new Application(animatables);

  app.init();
});
</script>
