<template>
  <section class="home-container">
    <div>
      <Techtheriac />
      <Bio />
    </div>
    <Footer />
  </section>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { applicationKey } from "~/obdk";
import { Application } from "~/utils/application";

const applicationInstance = inject<Application>(applicationKey);

console.log(
  "🚀 ~ file: Home.vue:13 ~ applicationInstance:",
  applicationInstance?.colors
);
</script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  padding: 0 var(--space-xs);
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
  background-color: var(--background-dark);
  transition-duration: 1s;
  transition-property: background-color;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
