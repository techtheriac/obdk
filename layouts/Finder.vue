<template>
  <div class="container-finder">
    <div class="wrapper-path">PATH</div>
    <div class="container-folder">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.container-finder {
  display: flex;
  flex-direction: column;
}

.container-folder {
  padding: 0 30px;
  display: flex;
}
</style>
