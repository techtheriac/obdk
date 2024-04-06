<template>
  <div class="fill-height">
    <ul>
      <li v-for="link in links">
        <a :href="link.link" target="_blank">{{ link.link }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
let links = ref<{ name: string; link: string }[]>([
  {
    name: "EMAIL",
    link: "mailto:techtheriac@outlook.com",
  },
  {
    name: "ARENA",
    link: "https://are.na/jezreel-franklin",
  },
  {
    name: "TWITTER",
    link: "https://twitter.com/techtheriac",
  },
  {
    name: "INSTAGRAM",
    link: "https://instagram.com/techtheriac",
  },
  {
    name: "VSCO",
    link: "https://vsco.com/jaefaux",
  },
]);
</script>

<style lang="scss" scoped>
@import "../assets/css/utilities/font-definitions";
ul {
  display: flex;
  flex-direction:  column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
li + li {
   margin-top: var(--space-xs);
}

li {
  @include lausanneNormal(300, var(--idealBaseFontSize));
  text-transform: uppercase;

  a {
    color: #fff;

    &:hover {
      text-decoration: underline;
    }
   }
}
</style>
