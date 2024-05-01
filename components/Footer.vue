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
footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 var(--space-xs) var(--space-xs);
  color: var(--foreground-100);
  font-family: "TWK Lausanne";
  text-transform: uppercase;
  font-weight: 200;
  font-size: var(--idealSubFontSize);
  z-index: 1;

  ul {
    display: inherit;
  }
  a {
    &:hover {
      color: inherit;
      text-decoration: underline;
    }
  }
}
</style>
