<template>
  <div class="bio hidden">
    <p>
      I am a software engineer with a keen interest on building for the
      internet. I currently work for Alat where I help develop and maintain
      backend infrastructures. Consider this website a haven for my musings, and
      ruminations.
    </p>
  </div>
</template>

<script lang="ts"></script>

<style lang="scss" scoped>
@import "../assets/css/utilities/font-definitions";
.bio {
  @include lausanneNormal(300, var(--idealBioFontSize));
  // text-transform: uppercase;
  color: #fff;
  letter-spacing: -0.005em;

  p {
    // max-width: 40ch;
  }
}
</style>
