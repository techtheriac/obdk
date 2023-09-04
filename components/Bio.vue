<template>
  <div class="bio">
    <p>I am a software engineer with a flair for design.</p>
    <p>This website is a haven for my musings, ruminations and interests.</p>
    <span> © Jezreel Obidike Franklin </span>
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
    @include gestaltNormal(300, 3.5rem);
    text-decoration: underline;
    color: #000;
  }
  span {
    @include gestaltCaps(400, 1rem);
    color: #000;
    margin-top: 20px;
    display: block;
  }
}
</style>
