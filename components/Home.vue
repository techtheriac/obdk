<template>
  <div class="home-container">
    <Footer />
    <BioGroup />
    <Techtheriac />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  min-height: calc(100vh - 20px);
  width: calc(100% - 30px);
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: fixed;
  z-index: 2;
  padding: 20px 15px 20px 15px;
  // background-color: var(--background-dark-07);
  background-color: var(--background-dark);
  transition-duration: 0.9s;
  transition-property: background-color;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
