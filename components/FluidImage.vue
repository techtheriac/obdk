<template>
  <div :style="style">
    <img
      v-if="mediaType == 'image'"
      :src="src"
      :width="intrinsicWidth"
      :height="intrinsicHeight"
      :alt="alt"
    />
    <video v-else="mediaType == 'video'" playsinline autoplay muted loop>
      <source :src="src" type="video/webm" />
    </video>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  intrinsicWidth: number;
  intrinsicHeight: number;
  scaleSize: number;
  src: string;
  alt: string;
  mediaType: "image" | "video";
}>();

const style = {
  "--size": props.scaleSize,
  "--unit": `calc((var(--size)/ ${props.intrinsicWidth}) * 1vmin)`,
  width: `calc(${props.intrinsicWidth} * var(--unit))`,
  height: `calc(${props.intrinsicHeight} * var(--unit))`,
};
</script>
<style scoped lang="scss">
img,
video {
  width: 100%;
  height: 100%;
}
</style>
