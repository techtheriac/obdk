<template>
  <div class="contact">
    <div>
      <p>techtheriac@outlook.com</p>
    </div>
    <ul >
      <li v-for="link in links">
        <a :href="link.link" target="_blank">{{ link.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
let links = ref<{ name: string; link: string }[]>([
  {
    name: "arena",
    link: "https://www.are.na/jezreel-franklin",
  },
  {
    name: "twitter",
    link: "https://twitter.com/techtheriac",
  },
  {
    name: "linkedIn",
    link: "https://www.linkedin.com/in/franklin-jezreel-101a0a6b/",
  },
  {
    name: "vsco",
    link: "https://www.are.na/jezreel-franklin",
  },
]);
</script>

<style lang="scss" scoped>
.contact {

}

ul {
  display: flex;
}
li + li {
   margin-left: 10px;
}
li {
  font-family: "Gestalt";
  text-transform: uppercase;
  font-size: 16px;

  a {
    color: #000;
   }
}
</style>
