<template>
  <div class="bio">
    <p>
      THIS WEBSITE IS JEZREEL'S ATTEMPT AT COLLECTING HIS RUMINATIONS, MUSINGS
      AND WORKS IN A UNFIED SPACE.
    </p>
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
@import "../assets/css/utilities/font-definitions";
.bio {
  p {
    max-width: 48ch;
    @include degularCaps(300, var(--idealBaseFontSize));
    text-transform: uppercase;
  }
}
</style>
