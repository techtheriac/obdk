<template>
  <footer>
    <h2>Get in touch</h2>
    <div class="outside">
      <div class="feed">Subscribe to fucking rss</div>
      <div class="links">
        <ul>
          <li v-for="link in links">
            <NuxtLink :to="link.link">{{ link.name }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const links = [
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
  flex-direction: column;

  h2 {
    align-self: center;
    font-size: 10vmin;
    font-weight: 700;
  }

  .outside {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  a {
    color: inherit;
    &:hover {
      text-decoration: underline;
    }
  }
}

.avatar {
  svg {
    stroke: var(--foreground-100);
    stroke: transparent;
    stroke-width: var(--stroke-width, 1);
  }
}

@media (prefers-color-scheme: dark) {
  .avatar {
    --stroke-width: 0.4;
  }
}
</style>
