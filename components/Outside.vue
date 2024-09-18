<template>
  <PreFooterItem title="Outside" meta="Links worth clicking">
    <p class="outside">
      <NuxtLink v-for="out in outside" :to="out.link">{{ out.name }}</NuxtLink>
    </p>
  </PreFooterItem>
</template>

<script setup lang="ts">
const outside = [
  {
    name: "The chemistry of reduce",
    link: "https://dev.to/techtheriac/the-chemistry-of-reduce-54m6",
  },
  {
    name: "Lambda (λ) Calculus For Javascript Developers",
    link: "https://gist.github.com/techtheriac/d0daa646b45fed7fba7c061bfc3154ee",
  },
  {
    name: "Notion as a content management system",
    link: "https://www.youtube.com/live/piY-Jp1qFo4",
  },
  {
    name: "Educative Answers - What are ASP Conditionals?",
    link: "https://www.educative.io/answers/what-are-asp-conditionals",
  },
];
</script>

<style scoped>
.outside {
  a {
    color: var(--foreground-100);
    text-decoration: underline;
    text-decoration-color: var(--border-color);
    text-underline-offset: 0.09em;
    text-decoration-thickness: 0.5px;
    &::after {
      content: "·";
    }
  }
}
</style>
