<template>
  <!-- <NuxtLink v-if="type == 'lab'" :to="content">
      <video playsinline autoplay muted loop poster="">
        <source :src="preview" type="video/webm" />
      </video>
      <span>{{ title }}</span>
    </NuxtLink> -->
  <div class="artefact-wrapper" v-if="type == 'photo'">
    <img :width="previewWidth" :height="previewHeight" :src="preview" />
    <span> {{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import { type Artefact } from "~/obdk";
const props = defineProps<Artefact>();
</script>

<style scoped lang="scss">
.artefact-wrapper {
  max-width: 120px;
  img {
    width: 100%;
    aspect-ratio: 12 / 16;
  }
}
</style>
