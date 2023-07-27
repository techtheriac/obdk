<template>
  <div class="home-container">
    <Techtheriac />
    <BioGroup />
    <Footer />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
  background-color: var(--background-dark);
  transition-duration: 1s;
  transition-property: background-color;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
