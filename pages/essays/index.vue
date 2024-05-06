<template>
  <div class="article-main">
    <header>
      <h1>Ruminations</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quia
        nesciunt autem vero itaque tenetur distinctio unde qui! Molestias id
        repudiandae earum quisquam corrupti vel nihil ducimus iusto quae? Neque.
      </p>
    </header>
    <ul class="tags_listing">
      <li @click="handleShowTag(tag)" v-for="tag in tags" :key="tag">
        <button>
          {{ tag }}
        </button>
      </li>
    </ul>

    <ul class="article_listing">
      <li
        class="musing__item"
        v-for="article in articles"
        :data-tags="article.tagsString"
        data-tag-show="true"
      >
        <div class="published-date">
          <span>
            {{ article.day }}
          </span>
          <span>
            {{ article.month }}
          </span>
        </div>
        <h3 class="title">
          <NuxtLink :to="article?.slug">{{ article?.title }}</NuxtLink>
        </h3>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
definePageMeta({
  layout: "article",
});

const musings = await queryContent("essays").find();
const { data: notion } = await useFetch("/api/get-notion-posts");

function handleShowTag(tag: string) {
  let elements = document.querySelectorAll("[data-tags]");
  if (!elements) return;

  elements.forEach((element) => {
    let attrs = element.getAttribute("data-tags");

    if (attrs?.includes(tag)) {
      element.setAttribute("data-tag-show", true);
    } else {
      element.setAttribute("data-tag-show", false);
    }
  });
}

function extractTagsFromNotion(document: any) {
  if (!document) return;
  const tagsArray = document?.properties?.tags?.multi_select.map((x) => x.name);
  const tagsString = tagsArray.join();
  return { tagsArray, tagsString };
}

function extractTagsFromMarkdown(document: string) {
  if (!document) return;
  const tagsArray = document.split(",");
  const tagsString = document;
  return { tagsArray, tagsString };
}

const essays = musings.map((post) => {
  let { day, month } = useDateTimeComponent(post.last_edited);
  const { tagsArray, tagsString } = extractTagsFromMarkdown(post.tags);
  return {
    day,
    month,
    title: post.title,
    slug: post._path,
    source: "local",
    stage: post.stage,
    genre: post.genre,
    tags: tagsArray,
    tagsString,
  };
});

const notes = notion.value!.results.map((post) => {
  let { day, month } = useDateTimeComponent(post.last_edited_time);
  const { tagsArray, tagsString } = extractTagsFromNotion(post);
  return {
    day,
    month,
    title: post.properties.name.title[0].plain_text,
    slug: `/notes/${post.properties.slug.rich_text[0].plain_text}`,
    source: "notion",
    stage: post.properties.stage.status.name,
    genre: post.properties.tags.multi_select[0].name,
    tags: tagsArray,
    tagsString,
  };
});

let articles = [...notes, ...essays];

const notesTags = notes.flatMap((x) => x.tags);
const essaysTags = essays.flatMap((x) => x.tags);

let tags = new Set([...notesTags, ...essaysTags]);
</script>

<style scoped lang="scss">
.tags_listing {
  display: flex;
}
.article_listing {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30ch, 1fr));
  grid-row-gap: var(--space-xs);
  grid-column-gap: var(--space-s);

  li {
    display: flex;
    align-items: center;
    gap: var(--space-s);
  }
}

.musing__item {
  color: var(--foreground-100);
  padding: var(--space-s) 0;
  width: 100%;
  border-bottom: 1px solid var(--border-color);

  &__border-aug {
    --aug-border-all: 1px;
    --aug-border-bg: var(--border-bg);
    --aug-tl: 0px;
  }
}

.title {
  font-size: var(--idealHeadingTwo);
  font-weight: 500;
  z-index: 2;
  position: relative;
  text-wrap: balance;

  a {
    color: var(--foreground-100);
    &:hover {
      color: var(--foreground-200);
    }
  }
}

.published-date {
  font-size: var(--idealSubFontSize);
  color: var(--foreground-200);
  display: flex;
  flex-direction: column;
  background-color: var(--background-200);
  gap: min(var(--space-xs), 0.3em);
  padding: var(--space-xs);
  border-radius: 0.3em;
}

[data-tag-show="true"] .title {
  a {
    color: var(--foreground-100);
  }
}
[data-tag-show="false"] .title {
  a {
    color: var(--foreground-200);
  }
}
</style>
