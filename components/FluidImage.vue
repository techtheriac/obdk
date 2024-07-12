<template>
  <div :style="style">
    <img
      :src="src"
      :width="intrinsicWidth"
      :height="intrinsicHeight"
      :alt="alt"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  intrinsicWidth: number;
  intrinsicHeight: number;
  scaleSize: number;
  src: string;
  alt: string;
}>();

const style = {
  "--size": props.scaleSize,
  "--unit": `calc((var(--size)/ ${props.intrinsicWidth}) * 1vmin)`,
  width: `calc(${props.intrinsicWidth} * var(--unit))`,
  height: `calc(${props.intrinsicHeight} * var(--unit))`,
};
</script>
<style scoped lang="scss">
img {
  width: 100%;
  height: 100%;
}
</style>
