<template>
  <div class="catalog-index">
    <section class="table">
      <div class="catalog">
        <div
          v-for="header in headers"
          :class="[header, 'sortable']"
          @click="orderByCat(header)"
        >
          {{ header }}
        </div>
      </div>
      <NuxtLink
        class="catalog"
        v-for="(item, index) in catalogIndex"
        :to="getUrl(item)"
      >
        <div class="index">{{ index }}</div>
        <div class="title">{{ item.title }}</div>
        <div class="category">{{ item.type }}</div>
        <div class="year">{{ item.year }}</div>
      </NuxtLink>
    </section>
    <section>
      <ol>
        <li v-for="cat in cats">{{ cat }}</li>
      </ol>
    </section>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "main",
});
import { Url } from "~/obdk";

const headers = ["index", "title", "category", "year"];

const local = await queryContent("essays").find();
const { data: notion } = await useFetch("/api/get-notion-posts");

const articles = useTextContent(local, notion as any);
const artefacts = await queryContent("artefacts").find();

interface Catalogue {
  year: string;
  title: string;
  type: "article" | "lab" | "project" | "photo" | "note";
  content: string | Url;
  preview?: string;
}

const artefactCatalog: Catalogue[] = artefacts.map((item) => {
  return {
    year: item.year as string,
    title: item.title as string,
    type: item.type,
    preview: item.preview,
    content: item.content,
  };
});

const textCatalog: Catalogue[] = articles.map((item) => {
  return {
    year: `20${item.year}`,
    title: item.title,
    type: item.source == "local" ? "note" : "article",
    content: item.slug,
  };
});

function getUrl(item: Catalogue): string {
  return item.type == "photo" ? "#" : item.content;
}

const catalogIndex = ref([...textCatalog, ...artefactCatalog]);

const cats = new Set(catalogIndex.value.map((x) => x.type));

function orderByCat(cat: string): void {
  console.log(cat);
}
</script>

<style scoped>
.catalog-index {
  font-family: Diatype;
  font-size: var(--step--2);
  text-transform: uppercase;
  color: var(--foreground-100);
  font-variation-settings:
    "slnt" 0,
    "MONO" 100;

  display: grid;
  grid-template-columns: 4fr 1fr;
}
.table {
  display: grid;
  height: fit-content;
  .catalog {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    display: inherit;
    color: var(--foreground-100);
    font-weight: 300;

    .index {
      grid-column: 1 / 2;
    }

    .title {
      grid-column: 2 / 7;
    }

    .category {
      grid-column: 7 / 8;
    }

    .year {
      grid-column: 8 / 9;
    }
  }
}

.sortable {
  cursor: pointer;
}
</style>
