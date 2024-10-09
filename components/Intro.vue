<template>
  <div class="intro fill-height">
    <div>
      <Techtheriac :should-blink="true" />
      <Bio />
    </div>
    <NowSlider />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.intro {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
