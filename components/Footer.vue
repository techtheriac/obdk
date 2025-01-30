<template>
  <footer>
    <div class="alias">
      <small>© Jezreel Franklin</small>
    </div>
    <ul class="links">
      <li v-for="link in links">
        <a :href="link.link" target="_blank">{{ link.name }}</a>
      </li>
    </ul>
  </footer>
</template>

<script setup>
const linksQuery = await queryContent("/footer").findOne();
const links = linksQuery.body;
</script>

<style lang="scss" scoped>
footer {
  border-top: 1px solid var(--border-color);
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: var(--space-xs) 0;
  font-size: var(--step--1);
  .links {
    display: flex;
    gap: var(--space-xs);
  }
}
</style>
