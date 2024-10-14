<template>
  <div class="layout-main">
    <Techtheriac :should-blink="true" :should-animate="true" />
    <main class="main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { type LandingAnimatable } from "~/utils/animations/landing";
import { Application } from "~/utils/application";

onBeforeMount(() => {
  const animatables: LandingAnimatable = {
    techtheriac: document.querySelector(".obdk")!,
    bio: document.querySelector(".bio")!,
    nowSlider: document.querySelector(".now-slider")!,
    flipContainer: document.querySelector(".flip-container")!,
    navigation: document.querySelector(".navigation")!,
    header: document.querySelector(".header")!,
  };

  new Application(animatables);
});
</script>

<style scoped lang="scss">
.layout-main {
  display: flex;
  flex-direction: column;
  color: var(--foreground-100);
  padding-inline: var(--space-xs);
}
</style>
