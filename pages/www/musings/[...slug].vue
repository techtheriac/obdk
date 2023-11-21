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
  layout: "article",
});
</script>

<style lang="scss">
#content {
  padding: 0 var(--space-s);
  max-width: 700px;
  font-family: "TWK Lausanne";
  margin: 0 auto;

  .title {
    text-transform: uppercase;
    font-size: var(--idealHeadingOne);
    font-weight: 400;
    margin-bottom: var(--space-s);
    letter-spacing: -1.22px;
  }

  .published {
    color: rgba(255, 255, 255, 0.63);
    font-family: "TWK Lausanne";
    font-size: 13px;
    font-style: normal;
    font-weight: 200;
    line-height: normal;
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
  }

  > p + p {
    margin-top: var(--space-s);
  }
}
</style>
