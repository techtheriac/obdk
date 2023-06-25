<template>
  <div class="bio">
    <p>
      THIS WEBSITE COLLECTS MY RUMINATIONS, MUSINGS AND WORKS IN A UNFIED SPACE.
      <br />
    </p>
    <p>I AM A SOFTWARE ENGINEER WITH A FLARE FOR DESIGN</p>
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
  > * + * {
    margin-top: 10px;
  }
  p {
    max-width: 40ch;
    @include degularCaps(300, var(--idealBaseFontSize));
    text-transform: uppercase;
  }
}
</style>
