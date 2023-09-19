<template>
  <div class="bio">
    <p>I am a software engineer with a keen interest on building things on the internet. 
    I currently work for ALAT where I help develop and maintain backend infrastructures. Consider this website a haven for my musings, and ruminations.</p>
    <!-- <p>When not aggressively slamming my keyboard to churn programs, I use music & poetry as mediums to keep my sanity intact. </p> -->
    <!-- <span>© Jezreel Obidike Franklin</span> -->
  </div>
</template>

<script lang="ts"></script>

<style lang="scss" scoped>
@import "../assets/css/utilities/font-definitions";
.bio {
  @include lausanneNormal(300, var(--idealBioFontSize));
  color: #000;
  letter-spacing: -0.005em;

  > * + * {
    margin-top: var(--space-xs);
  }

  span {
    display: block;
  }
}
</style>
