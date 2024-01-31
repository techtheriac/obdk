<template>
  <ContentDoc v-slot="{ doc }">
    <article id="content">
      <PublishedTitle
        :title="doc.title"
        :date="doc.last_edited"
        :genre="doc.genre"
      />
      <ContentRenderer :value="doc" />
    </article>
  </ContentDoc>
</template>

<script setup>
definePageMeta({
  layout: "article",
});
</script>
<style lang="scss"></style>
