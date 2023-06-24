<template>
  <div class="wrapper-frosted">
    <span v-for="blur in blurValues" :style="{ '--blur': `${blur}px` }"></span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const blurValues = ref([
  41.4047493403694, 32.84372408594045, 24.02623445156427, 15.208744817188087,
  6.391255182811913, 1, 1, 1,
]);
</script>

<style lang="scss" scoped>
.wrapper-frosted {
  width: 200px;
  height: 100px;
  inset: 0;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 20px 40px 1px rgba(0, 0, 0, 0.12),
    inset 0 -10px 20px -5px rgba(0, 0, 0, 0.3),
    0 150px 100px -80px rgba(0, 0, 0, 0.4),
    inset 0 1px 4px hsla(0, 0%, 100%, 0.6),
    inset 0 -1px 1px 1px rgba(0, 0, 0, 0.2);
}

span {
  display: block;
  z-index: 1;
  inset: -40px;
  --offset: 50%;
  backdrop-filter: blur(var(--blur));
  --webkit-backdrop-filter: blur(var(--blur));
  --webkit-mask-image: linear-gradient(
      to right,
      transparent calc(var(--x) - var(--offset)),
      #000 calc(var(--x) - var(--offset) / 2),
      #000 calc(var(--x) + var(--offset) / 2),
      transparent calc(var(--x) + var(--offset))
    ),
    linear-gradient(
      to bottom,
      transparent 40px,
      #000 44px,
      #000 calc(100% - 44px),
      transparent calc(100% - 40px)
    ),
    linear-gradient(
      to right,
      transparent 40px,
      #000 44px,
      #000 calc(100% - 44px),
      transparent calc(100% - 40px)
    );
  --webkit-mask-composite: destination-in;
}

span:first-of-type {
  --x: 11.11%;
}
span:nth-of-type(2) {
  --x: 22.22%;
}
span:nth-of-type(3) {
  --x: 33.33%;
}
span:nth-of-type(4) {
  --x: 44.44%;
}
span:nth-of-type(5) {
  --x: 55.55%;
}
span:nth-of-type(6) {
  --x: 66.66%;
}
span:nth-of-type(7) {
  --x: 77.77%;
}
span:nth-of-type(8) {
  --x: 88.88%;
}
</style>
