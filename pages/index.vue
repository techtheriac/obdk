<template>
  <main>
    <Home />
    <Burger />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { LandingAnimatable } from "~/utils/animations/landing";
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
.layout-base > section {
  height: inherit;
}
</style>
