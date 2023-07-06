<template>
  <canvas id="noise"></canvas>
</template>

<script setup lang="ts">
import { Message } from "~/obdk";

onMounted(() => {
  const canvas = document.getElementById("noise") as HTMLCanvasElement;

  if (canvas) {
    const { offsetHeight, offsetWidth } = canvas;

    const offscreen = canvas.transferControlToOffscreen();

    const worker = new Worker("/workers/noise.js");

    const message: Message = {
      canvas: offscreen,
      dimension: {
        width: offsetWidth,
        height: offsetHeight,
      },
    };

    worker.postMessage(message, [offscreen]);
  }
});
</script>

<style scoped>
#noise {
  background-color: black;
  width: 100%;
  height: 100vh;
  z-index: -1;
}
</style>
