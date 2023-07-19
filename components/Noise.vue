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
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      },
    };

    worker.postMessage(message, [offscreen]);
  }
});
</script>

<style scoped>
#noise {
  background-color: black;
  width: inherit;
  height: 100%;
  z-index: -1;
}
</style>
