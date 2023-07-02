<template>
  <div class="home-container">
    <Footer />
    <BioGroup />
    <Obdk />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  min-height: inherit;
  width: inherit;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: fixed;
  z-index: 0;
}
</style>
