<template>
  <article id="content">
    <PublishedTitle
      :title="postData.properties.name.title[0].plain_text"
      :date="postData.created_time"
      :genre="postData.properties.tags.multi_select[0]?.name"
    />
    <NotionRenderer data-content :postContent="postContent" />
    <BackLink :backlinks="postData?.properties?.related?.relation" />
    <ArticleFooter :current-slug="slug" :contents="contents" />
  </article>
</template>

<script setup lang="ts">
// @ts-nocheck
definePageMeta({
  layout: "article",
});

const slug = useRoute().params?.slug[0];
const { data } = await useFetch(`/api/get-notion-post/${slug}`);
const { postContent, postData } = data.value;

console.log(postData);

// footer content
const { data: notion } = await useFetch("/api/get-notion-posts");
const contents = computed(() => {
  const notes: HarmonizedArticle[] = notion.value!.results.map((post) => {
    return {
      date: post.last_edited_time,
      title: post.properties.name.title[0].plain_text,
      slug: `/notes/${post.properties.slug.rich_text[0].plain_text}`,
      source: "notion",
      stage: post.properties.stage.status.name,
      genre: post.properties.tags.multi_select[0].name,
    };
  });

  return notes;
});
</script>
