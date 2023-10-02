<template>
  <section class="home-container">
    <div class="wrapper-bio">
      <Techtheriac />
      <Bio />
    </div>
    <Spotify />
  </section>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { applicationKey } from "~/obdk";
import { Application } from "~/utils/application";

const applicationInstance = inject<Application>(applicationKey);
</script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  padding: 0 var(--space-xs);
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
  background-color: var(--background-dark-07);
  transition-duration: 1s;
  transition-property: background-color;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.wrapper-bio {
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}
</style>
