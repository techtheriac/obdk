<template>
  <div class="control-wrapper">
    <div class="triangle"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  playing: boolean;
}>();
</script>
<style scoped lang="scss">
@use "sass:math";
@mixin triangle($sideLength, $size) {
  $hypotenuse: $sideLength; // renaming to make calculations more logical
  $angle: 60deg;
  $opposite: math.sin($angle) * $hypotenuse;
  $adjacent: $hypotenuse / 2;
  $startPos: ($size / 2 - $adjacent);
  $startPosY: ($size / 2 - $opposite / 2);
  $endPos: ($size / 2 + $adjacent);
  $endPosY: ($size / 2 + $opposite / 2);
  $clip: polygon($startPos $endPosY, 50% $startPosY, $endPos $endPosY);
  -webkit-clip-path: $clip;
  clip-path: $clip;
}
.control-wrapper {
  width: 100%;
}

.triangle {
  @include triangle(30%, 100%);
  transform: rotate(90deg);
  background-color: red;
}
</style>
