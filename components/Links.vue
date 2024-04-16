<template>
  <Now
    title="WT•Footer!"
    description="Stuff you put in the footer"
    :summary="summary"
  >
    <ul>
      <li v-for="link in links">
        <NuxtLink :to="link.link">{{ link.name }}</NuxtLink>
      </li>
    </ul>
  </Now>
</template>

<script setup lang="ts">
const links = [
  {
    name: "are.na",
    link: "https://www.are.na/jezreel-franklin/channels",
  },
  {
    name: "TW",
    link: "https://twitter.com/techtheriac",
  },
  {
    name: "LNKDN",
    link: "https://www.linkedin.com/in/franklin-jezreel/",
  },
  {
    name: "MAIL",
    link: "mailto:techtheriac@outlook.com",
  },
];

const summary = computed(() => {
  return `${links.length} links`;
});
</script>

<style lang="scss" scoped>
ul {
  width: 100%;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3em;

  a {
    font-family: "Space Mono";
    color: inherit;
    text-transform: uppercase;
    font-size: var(--idealSubFontSize);
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
