<template>
  <div class="container__writing">
    <TagsFilter :tags="tags" />
    <section class="article-container">
      <ArticleListing :articles="articles" />
    </section>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
const local = await queryContent("essays").find();
const { data: notion } = await useFetch("/api/get-notion-posts");
let { tags, articles } = useTextContent(local, notion);
</script>

<style scoped lang="scss">
.container__writing {
  display: block;
}
</style>
