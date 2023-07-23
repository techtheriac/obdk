<template>
  <div class="container-path">
    <div class="wrapper-path docked">
      <!-- <div>←</div> -->
      <!-- <div>{{ path }}</div> -->
      <Navigation />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  path: String,
});
</script>

<style scoped>
.container-path {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper-path {
  border: 1px solid white;
  width: 20%;
  display: flex;
  padding: 0.5em 0.1em;
}

.docked {
  display: flex;
  justify-content: center;
  align-items: center;
}

.maximized {
  width: 80%;
}
</style>
