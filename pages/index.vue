<template>
  <div class="home-container">
    <Footer />
    <BioGroup />
    <Obdk />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
onMounted(() => {});
</script>

<style lang="scss" scoped>
.home-container {
  min-height: calc(100vh - 15px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 15px 0px 15px;
}
</style>
