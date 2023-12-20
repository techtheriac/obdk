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

<style lang="scss">
#content {
  padding: 0 var(--space);
  max-width: 700px;
  font-family: "TWK Lausanne";
  margin: 0 auto;
}

[data-content-id] {
  color: rgba(255, 255, 255, 0.83);
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-decoration: underline;
  }

  p {
    line-height: 1.3;
    font-size: var(--idealArticleParagraphSize);
    font-weight: 200;
  }

  > p + p {
    margin-top: var(--space-xs);
  }
}
</style>
