<template>
  <ul class="outside">
    <li v-for="outside in externalLinks">
      <a :href="outside.link" target="_blank">{{ outside.name }}</a>
    </li>
  </ul>
</template>

<script lang="ts">
type ExternalLink = {
  name: string;
  link: string;
};

export default {
  setup() {
    return {
      externalLinks: [
        {
          name: "vsco",
          link: "https://www.are.na/jezreel-franklin",
        },
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
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.outside {
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    font-family: "Gestalt";
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: -0.09em;

    a {
      color: var(--foreground-dark);
    }
  }
}
</style>
