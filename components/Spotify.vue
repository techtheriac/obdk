<template>
  <div class="spotify">
    <Rounded />
    <div class="track-info">
      <span>NP: FRANK OCEAN - NIKES</span>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
    };
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
