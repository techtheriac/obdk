<template>
  <div
    id="main-layout"
    class="layout-main"
    :class="{ loading: $route.fullPath == '/' }"
  >
    <Techtheriac />
    <main class="main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.layout-main {
  display: flex;
  flex-direction: column;
  color: var(--foreground-100);
  padding-inline: var(--space-xs);
}
</style>

<script setup lang="ts">
// import { gsap } from "gsap";
// onBeforeMount(() => {
//   if (window.location.pathname !== "/") {
//     let body = document.querySelector("body");

//     if (body) {
//       body.classList.remove("loading");
//     }

//     const techtheriac = document.querySelector(".obdk");

//     if (!techtheriac) return;

//     const timeline = gsap
//       .timeline()
//       .to(techtheriac, {
//         height: "40px",
//         duration: 0.5,
//       })
//       .from(".main", {
//         autoAlpha: 0,
//       })
//       .play();
//   }
// });
</script>
