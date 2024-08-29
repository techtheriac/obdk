<template>
  <ul>
    <li v-for="artefact in artefacts">
      <Artefact
        :type="artefact.type"
        :preview="artefact.preview"
        :content="artefact.content"
        :title="artefact.title"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
const artefacts = await queryContent("artefacts").find();
</script>

<style scoped lang="scss">
ul {
  display: grid;
  gap: var(--grid-gutter);
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  // width: 100%;
  // padding-inline: var(--grid-gutter);
  // display: flex;
  // flex-wrap: nowrap;
  // gap: var(--space-s);
}
</style>
