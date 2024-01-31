<template>
  <div>
    <PublishedTitle
      :title="postData.properties.name.title[0].plain_text"
      :date="postData.created_time"
      genre="essay"
    />
    <ClientOnly>
      <NotionRenderer :postContent="postContent" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
definePageMeta({
  layout: "article",
});

const slug = useRoute().params?.slug[0];
const { data } = await useFetch(`/api/get-notion-post/${slug}`);
const { postContent, postData } = data.value;
</script>

<style scoped></style>
