<template>
  <nav class="navigation">
    <ul>
      <li v-for="(link, index) in links">
        <NuxtLink :to="link.link" :key="index">{{ link.name }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
export default {
  setup() {
    return {
      links: [
        {
          name: "index",
          link: "/home",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  ul {
    display: flex;
    gap: 5px;
    li {
      font-family: "Degular Variable";
      text-transform: uppercase;
      font-size: 16px;
      letter-spacing: -0.09em;
      a {
        color: var(--foreground-dark);
        text-decoration: underline;
      }
    }
  }
}
</style>
