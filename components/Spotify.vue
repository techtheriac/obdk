<template>
  <div class="spotify">
    <Rounded />
    <div class="track-info">
      <span>NP: FRANK OCEAN - NIKES</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import logger from "../infrastructure/Spotify";
export default {
  name: "Spotify",

  setup(props) {
    onMounted(() => logger());
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/utilities/font-definitions";
.spotify {
  display: flex;
  align-items: center;
}
.track-info {
  margin-left: 4px;
  color: var(--foreground-dark-forest);
  @include degularCaps(400, var(--idealBaseFontSize));

  &:hover {
    cursor: pointer;
  }
}
</style>
