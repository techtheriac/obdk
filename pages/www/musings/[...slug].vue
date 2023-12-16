<template>
  <ContentDoc v-slot="{ doc }">
    <article id="content">
      <span class="published">{{ doc.last_edited }}</span>
      <h1 class="title">{{ doc.title }}</h1>
      <ContentRenderer :value="doc" />
    </article>
  </ContentDoc>
</template>

<script setup>
definePageMeta({
  layout: "main",
});
</script>

<style lang="scss">
#content {
  padding: 0 var(--space);
  max-width: 700px;
  font-family: "TWK Lausanne";
  margin: 0 auto;

  .title {
    text-transform: capitalize;
    font-size: var(--idealHeadingOne);
    font-weight: 750;
    margin-bottom: var(--space);
    margin-top: var(--space-xs);
    line-height: 0.89;
    letter-spacing: -1.22px;
  }

  .published {
    color: rgba(255, 255, 255, 0.63);
    font-family: "TWK Lausanne";
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: normal;
    text-transform: uppercase;
  }
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
    font-weight: 300;
  }

  > p + p {
    margin-top: var(--space-xs);
  }
}
</style>
