<template>
  <div class="bio">
    <p>I am a software engineer with a keen interest on building things on the internet. 
    I currently work for ALAT where I help build and maintain backend infrastructures. </p>
    <p>When not aggressively slamming my keyboard to churn programs, I use music & poetry as mediums to keep my sanity intact. </p>
    <p>Consider this website a haven for my musings, and ruminations.</p>
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
  margin-top: 2em;
  p {
    //max-width: 60ch;
    @include gestaltCaps(300, 16px);
    letter-spacing: -0.005em;
    color: #000;
  }
  span {
    @include gestaltCaps(400, 1rem);
    color: #000;
    margin-top: 1em;
    display: block;
  }
}
</style>
