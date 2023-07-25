<template>
  <div class="bio">
    <p>I am a software engineer with a flair for design</p>
    <p>This website collects my musings, ruminations and work.</p>
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
    max-width: 50ch;
    @include gestaltCaps(300, 2rem);
    color: #000;
  }
}
</style>
