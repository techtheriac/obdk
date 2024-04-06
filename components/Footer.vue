<template>
  <footer>
    <div>
      <small> © Franklin Jezreel </small>
    </div>
    <ul>
      <li v-for="link in links">
        <NuxtLink :to="link.link">{{ link.name }}</NuxtLink>
      </li>
    </ul>
  </footer>
</template>

<script setup lang="ts">
const links = [
  {
    name: "about",
    link: "/about",
  },
  {
    name: "tw",
    link: "https://twitter.com/techtheric",
  },
  {
    name: "ln",
    link: "https://www.linkedin.com/in/franklin-jezreel/",
  },
];
</script>

<style lang="scss" scoped>
@import "../assets/css/utilities/font-definitions";
footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: rgba(255, 255, 255, 0.63);
  font-family: "TWK Lausanne";
  text-transform: uppercase;
  font-weight: 200;
  z-index: 1;
  padding: 0 var(--space-xs) var(--space-xs);
  font-size: var(--idealSubFontSize);

  ul {
    display: inherit;
  }
  a {
    color: inherit;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
