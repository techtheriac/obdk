<template>
  <div>
    <ContentDoc v-slot="{ doc }">
      <article id="content" class="article-block-flow">
        <PublishedTitle
          :title="doc.title!"
          :date="doc.last_edited"
          :genre="doc.genre"
        />
        <ContentRenderer data-content :value="doc" />
      </article>
    </ContentDoc>
    <ArticleFooter
      :current-slug="slug"
      :contents="contents"
      content-type="essays"
    />
  </div>
</template>

<script setup lang="ts">
import { HarmonizedArticle } from "~/obdk";

definePageMeta({
  layout: "article",
});

// fetch data for article footer
const slug = useRoute().params?.slug[0];
const musings = await queryContent("essays").find()!;

const contents = computed(() => {
  const essays: HarmonizedArticle[] = musings.map((post) => {
    return {
      date: post.last_edited!,
      title: post.title!,
      slug: post._path!,
      source: "local",
      stage: post.stage,
      genre: post.genre,
    };
  });

  return essays;
});
</script>
