<template>
  <div class="bio">
    <p>
      THIS IS THE WEBSITE OF FRANKLIN JEZREEL, A SOFTWARE ENGINEER, DESIGNER,
      TINKERER, AND PROFESSIONAL BAD BOY FROM NIGERIA
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
  }
}
</style>
